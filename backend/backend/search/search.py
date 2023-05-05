from __future__ import annotations
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import time

from extract.extract import SenateMinutes


class SearchEngine:
    def __init__(self):
        # Initialize the model
        self.model = SentenceTransformer("msmarco-distilbert-base-dot-prod-v3")

    # Returns the required proposal-resolution pair
    def _fetch_minutes_info(self, minutes, doc_index, resolution_idx):
        return minutes[doc_index[resolution_idx][0]].proposals[
            doc_index[resolution_idx][1]
        ]

    def _faiss_search(self, query, minutes, doc_index, top_k, index):
        t = time.time()

        # Encode the query using the model
        query_vector = self.model.encode([query])

        # Retrieve the top-K results
        top_k_results = index.search(query_vector, top_k)

        # print('>>>> Results in Total Time: {}'.format(time.time()-t))

        top_k_ids = top_k_results[1].tolist()[0]
        top_k_ids = list(dict.fromkeys(top_k_ids))

        # Return the top-k retrieved results
        results = [
            self._fetch_minutes_info(minutes, doc_index, idx) for idx in top_k_ids
        ]
        return results

    # Takes in a search query as input, along with the list of SenateMinutes objets

    def search(self, query, minutes: list[SenateMinutes]):
        docs, doc_index = [], []
        print(f"DOCS=================================== {len(minutes)}")
        for m, minute in enumerate(minutes):
            for i in range(len(minute.proposals)):
                doc = (
                    minute.proposals[i]["proposal_id"]
                    + " "
                    + minute.proposals[i]["proposal"]
                    + "\n"
                    + minute.proposals[i]["resolution"]
                )
                docs.append(doc)
                doc_index.append((m, i))

        # Process data and create a FAISS (Facebook AI Similarity Search) index
        encoded_data = self.model.encode(docs)
        encoded_data = np.asarray(encoded_data.astype("float32"))
        index = faiss.IndexIDMap(faiss.IndexFlatIP(768))
        index.add_with_ids(encoded_data, np.arange(len(docs)))
        faiss.write_index(index, "senate_resolution.index")

        # Search within the documents
        results = self._faiss_search(query, minutes, doc_index, top_k=10, index=index)

        return results
