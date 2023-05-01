from __future__ import annotations
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import time

from extract.extract import SenateMinutes


class SearchEngine:
    def __init__(self):
        self.model = SentenceTransformer('msmarco-distilbert-base-dot-prod-v3')

    def _fetch_minutes_info(self, minutes, doc_index, resolution_idx):
        return minutes[doc_index[resolution_idx][0]].proposals[doc_index[resolution_idx][1]]

    def _faiss_search(self, query, minutes, doc_index, top_k, index):
        t = time.time()
        query_vector = self.model.encode([query])
        top_k_results = index.search(query_vector, top_k)
        # print('>>>> Results in Total Time: {}'.format(time.time()-t))
        top_k_ids = top_k_results[1].tolist()[0]
        top_k_ids = list(dict.fromkeys(top_k_ids))
        results = [self._fetch_minutes_info(
            minutes, doc_index, idx) for idx in top_k_ids]
        return results

    def search(self, query, minutes: list[SenateMinutes]):
        docs, doc_index = [], []
        for m, minute in enumerate(minutes):
            for i in range(len(minute.proposals)):
                doc = minute.proposals[i]['proposal_id'] + ' ' + \
                    minute.proposals[i]['proposal'] + '\n' + \
                    minute.proposals[i]['resolution']
                docs.append(doc)
                doc_index.append((m, i))

        # Process data
        encoded_data = self.model.encode(docs)
        encoded_data = np.asarray(encoded_data.astype('float32'))
        index = faiss.IndexIDMap(faiss.IndexFlatIP(768))
        index.add_with_ids(encoded_data, np.array(range(0, len(docs))))
        faiss.write_index(index, 'senate_resolution.index')

        # Search within the documents
        results = self._faiss_search(query, minutes, doc_index,
                                     top_k=10, index=index)

        return results