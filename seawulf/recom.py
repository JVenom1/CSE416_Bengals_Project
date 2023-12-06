from gerrychain import Graph, Partition, constraints, MarkovChain, accept
from gerrychain.updaters import Tally
from functools import partial
from gerrychain.proposals import recom
from tqdm import tqdm
import multiprocessing as mp
import sys
import os
import random

def generate_district_plan(state, graph_file, population_constraint, num_steps, district_plan_number, ensemble_number):
    directory = state + "/" + str(ensemble_number) + "/graphs"
    os.makedirs(directory, exist_ok=True)
    
    graph = Graph.from_json(graph_file)
    initial_partition = Partition(
        graph,
        assignment = "District",
        updaters={
            "population": Tally("Total VAP", alias = "population"),
        }
    )
    ideal_population = sum(initial_partition["population"].values()) / len(initial_partition)
    proposal = partial(recom,
                   pop_col="Total VAP",
                   pop_target=ideal_population,
                   epsilon=population_constraint,
                   node_repeats=2
                  )
    compactness_bound = constraints.UpperBound(
        lambda p: len(p["cut_edges"]),
        2*len(initial_partition["cut_edges"])
    )
    pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, population_constraint)
    random.seed(ensemble_number * 10000 + district_plan_number)
    chain = MarkovChain(
        proposal=proposal,
        constraints=[
            pop_constraint,
            compactness_bound
        ],
        accept=accept.always_accept,
        initial_state=initial_partition,
        total_steps=num_steps,
    )

    for plan in tqdm(chain, total=num_steps, desc="Running Markov Chain"):
        last_plan = plan

    output_graph = last_plan.graph.copy()
    new_assignment = last_plan.assignment
    for precinct_id, _ in last_plan.assignment.items():
        output_graph.nodes[precinct_id]["District"] = new_assignment[precinct_id]
    filename = directory + "/" + state + str(district_plan_number) + ".json"
    output_graph.to_json(filename)
    print(f'The plan has been exported to {filename}')

if __name__ == "__main__":
    state = sys.argv[1]
    ensemble_number = int(sys.argv[2])
    ensemble_size = int(sys.argv[3])
    parallel_workers = mp.Pool(processes=40)
    jobs = []

    for district_plan_number in range(1, ensemble_size + 1):
        if state == "NC":
            job = parallel_workers.apply_async(generate_district_plan, (state, "NCGraph.json", 0.13, 10000, district_plan_number, ensemble_number))
            jobs.append(job)
    
    for job in jobs:
        job.get()

    parallel_workers.close()
