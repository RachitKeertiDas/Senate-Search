import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import time
from extract import SenateMinutes


def fetch_minutes_info(resolution_idx):
    meta_dict = dict()
    meta_dict['Proposal_ID'] = minutes_47.proposals[resolution_idx]['proposal_id']
    meta_dict['Proposal'] = minutes_47.proposals[resolution_idx]['proposal']
    meta_dict['Resolution'] = minutes_47.proposals[resolution_idx]['resolution']
    return meta_dict


def search(query, top_k, index, model):
    t = time.time()
    query_vector = model.encode([query])
    top_k_results = index.search(query_vector, top_k)
    print('>>>> Results in Total Time: {}'.format(time.time()-t))
    top_k_ids = top_k_results[1].tolist()[0]
    top_k_ids = list(np.unique(top_k_ids))
    results = [fetch_minutes_info(idx) for idx in top_k_ids]
    return results


# Data
filepath_47 = '../../../Minutes/47th Senate/47th Senate Meeting-Section A Minutes-final-converted.pdf'
minutes_47 = SenateMinutes(filepath=filepath_47, senate_number=47)
minutes_47.extract()
docs = []
for i in range(len(minutes_47.proposals)):
    doc = minutes_47.proposals[i]['proposal_id'] + ' ' + \
        minutes_47.proposals[i]['proposal'] + '\n' + \
        minutes_47.proposals[i]['resolution']
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
query = "Course Conversion"
results = search(query, top_k=10, index=index, model=model)
print('Query:', query)
print("\n")
for result in results:
    print('\t', result)
