import os
from gerrychain import Graph, Partition, Election
from gerrychain.updaters import Tally

def create_partitions(directory, detailed = False):
    files = os.listdir(directory)
    files.sort()
    files = list(map(lambda x: directory + "/" + x, files))
    files = [filename for filename in files if filename.endswith(".json")]
    return list(map(lambda file: convert_json_to_partition(file, detailed), files))

def convert_json_to_partition(graph_file, detailed = False):
    graph = Graph.from_json(graph_file)
    
    updaters = {"population": Tally("Total VAP", alias = "population")}

    if(detailed):
        election = Election("winner", {"Dem": "Democrat Votes", "Rep": "Republican Votes"})
        additional_updaters = {
            "white": Tally("White VAP", alias = "white"),
            "black": Tally("Black or African American VAP", alias = "black"),
            "native american": Tally("American Indian and Alaska Native VAP", alias = "native american"),
            "asian": Tally("Asian VAP", alias = "asian"),
            "islander": Tally("Native Hawaiian and Other Pacific Islander VAP", alias = "islander"),
            "other": Tally("Other VAP", alias = "other"),
            "winner": election
        }
        updaters.update(additional_updaters)

    initial_partition = Partition(
        graph,
        assignment = "District",
        updaters = updaters
    )
    return initial_partition
