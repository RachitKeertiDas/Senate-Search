import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import time
from extract import SenateMinutes


def fetch_minutes_info(minutes, resolution_idx):
    return minutes.proposals[resolution_idx]


def search(query, minutes, top_k, index, model):
    t = time.time()
    query_vector = model.encode([query])
    top_k_results = index.search(query_vector, top_k)
    print('Top-K:', top_k_results)
    print('>>>> Results in Total Time: {}'.format(time.time()-t))
    top_k_ids = top_k_results[1].tolist()[0]
    top_k_ids = list(dict.fromkeys(top_k_ids))
    results = [fetch_minutes_info(minutes, idx) for idx in top_k_ids]
    return results


filepath = '../../../Minutes/51st Senate/51st Senate minutes.pdf'
minutes = SenateMinutes(filepath=filepath, senate_number=51)
minutes.extract()
docs = []
for i in range(len(minutes.proposals)):
    doc = minutes.proposals[i]['proposal_id'] + ' ' + \
        minutes.proposals[i]['proposal'] + '\n' + \
        minutes.proposals[i]['resolution']
    docs.append(doc)

# Model
model = SentenceTransformer('msmarco-distilbert-base-dot-prod-v3')

# Process data
encoded_data = model.encode(docs)
encoded_data = np.asarray(encoded_data.astype('float32'))
index = faiss.IndexIDMap(faiss.IndexFlatIP(768))
index.add_with_ids(encoded_data, np.array(range(0, len(docs))))
faiss.write_index(index, 'senate_resolution.index')


# Query
query = "Additional Course Conversion"
results = search(query, minutes, top_k=10, index=index, model=model)
print('Query:', query)
print("\n")
for result in results:
    print('\t', result)
