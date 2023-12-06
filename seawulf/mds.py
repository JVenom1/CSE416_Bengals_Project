from sklearn.manifold import MDS
import numpy as np
import json
import sys

# can probably place mds and clustering together in this file

def mds(state, ensemble, distance_measure):
    ensemble_directory = state + "/" + ensemble
    #directory = state

    distance_matrix_file = ensemble_directory + "/" + distance_measure + ".json"
    print(distance_matrix_file)
    with open(distance_matrix_file, 'r') as file:
        list_of_distance_measures = json.load(file)
    distance_matrix = np.array(list_of_distance_measures)

    mds = MDS(n_components=2, dissimilarity='precomputed')
    mds_points = mds.fit_transform(distance_matrix)

    list_of_mds_points = mds_points.tolist()
    export_file = ensemble_directory + "/" + "mds_" + distance_measure + ".json"
    json_data = json.dumps(list_of_mds_points)
    with open(export_file, "w") as json_file:
        json_file.write(json_data)
    print("Successfully exported " + distance_measure + " matrix to " + export_file)

state = sys.argv[1]
ensemble_number = sys.argv[2]
distance_measure = sys.argv[3]
mds(state, ensemble_number, distance_measure)