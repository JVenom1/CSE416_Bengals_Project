from optimaltransport import Pair
from tqdm import tqdm
import numpy as np
import json
import extract_district_plans
import sys

def generate_distance_matrix(state, ensemble_number, distance_measure):
    ensemble_directory = state + "/" + ensemble_number
    plan_directory = ensemble_directory + "/graphs"
    district_plans = extract_district_plans.create_partitions(plan_directory)
   
    num_plans = len(district_plans)
    distances = np.zeros((num_plans, num_plans), dtype=float)
    for current_idx, current_plan in tqdm(enumerate(district_plans)):
            for plan_to_compare_idx in range(current_idx + 1, num_plans):
                plan_to_compare = district_plans[plan_to_compare_idx]
                if distance_measure == "optimal_transport":
                    distances[current_idx, plan_to_compare_idx] = Pair(current_plan, plan_to_compare).distance
                elif distance_measure == "hamming_distance":
                    distances[current_idx, plan_to_compare_idx] = hamming_distance(current_plan, plan_to_compare)
                distances[plan_to_compare_idx, current_idx] = distances[current_idx, plan_to_compare_idx]
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

state = sys.argv[1]
ensemble_number = sys.argv[2]
distance_measure = sys.argv[3]
generate_distance_matrix(state, ensemble_number, distance_measure)