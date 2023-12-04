from gerrychain import Graph
import numpy as np
import geopandas
import sys
import os

# Prerequisite: Must have a graphs directory in parent directory and file_name exists in graphs directory
# Exports the district plan graph JSON file as a consolidated geoJSON file containing district level information
def export_district_plan(state, ensemble_number, district_plan_number, state_geojson_file):
    directory = state + "/" + ensemble_number
    file_name = state + district_plan_number
    graph_file = directory + "/graphs/" + file_name + ".json"
    graph = Graph.from_json(graph_file)
    precincts = geopandas.read_file(state_geojson_file)
    for row in range(len(precincts)):
       precincts.at[row, "District"] = graph.nodes[row]["District"]
    districts = precincts.dissolve(by="District", aggfunc="sum")

    districts["Winner"] = np.where(districts["Republican Votes"] > districts["Democrat Votes"], "Republican", "Democrat")

    exported_plans_directory = directory + "/exported"
    os.makedirs(exported_plans_directory, exist_ok=True)
    output_geojson_file = exported_plans_directory + "/" + file_name + ".geojson"

    districts.to_file(output_geojson_file, driver='GeoJSON')
    print("Successfully exported to " + output_geojson_file)

state = sys.argv[1]
ensemble_number = sys.argv[2]
file_name = sys.argv[3]
if(state == "NC"):
    export_district_plan(state, ensemble_number, file_name, "NCSimplified.geojson")

