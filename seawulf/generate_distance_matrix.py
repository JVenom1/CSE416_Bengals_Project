from optimaltransport import Pair
from tqdm import tqdm
import numpy as np
import json
import extract_district_plans
import sys

# Prerequisite: random district plan graphs have been generated and placed into its respective graphs directory

def generate_distance_matrix(state, ensemble_number, distance_measure):
    ensemble_directory = state + "/" + ensemble_number
    plan_directory = ensemble_directory + "/graphs"
    district_plans = extract_district_plans.create_partitions(plan_directory)
   
    num_plans = len(district_plans)
    distances = np.zeros((num_plans, num_plans), dtype=float)
    for outer_idx, outer_plan in tqdm(enumerate(district_plans)):
            for inner_idx in range(outer_idx + 1, num_plans):
                inner_plan = district_plans[inner_idx]
                if distance_measure == "optimal_transport":
                    distances[outer_idx, inner_idx] = Pair(outer_plan, inner_plan).distance
                elif distance_measure == "hamming_distance":
                    distances[outer_idx, inner_idx] = hamming_distance(outer_plan, inner_plan)
                distances[inner_idx, outer_idx] = distances[outer_idx, inner_idx]
    distances = distances / np.max(distances)

    list_of_distances = distances.tolist()
    export_file = ensemble_directory + "/" + distance_measure + ".json"
    json_data = json.dumps(list_of_distances)
    with open(export_file, "w") as json_file:
        json_file.write(json_data)
    print("Successfully exported " + distance_measure + " matrix to " + export_file)

def hamming_distance(partition_a, partition_b):
  hamming_distance = 0
  for precinct in range(len(partition_a.assignment)):
    if partition_a.assignment[precinct] != partition_b.assignment[precinct]:
      hamming_distance += 1
  return hamming_distance

state = sys.argv[0]
ensemble_number = sys.argv[1]
distance_measure = sys.argv[2]
generate_distance_matrix(state, ensemble_number, distance_measure)