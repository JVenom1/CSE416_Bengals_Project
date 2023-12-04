import geopandas as gpd
import pandas as pd
import os
import csv
import maup
from gerrychain import Graph

def convert_shapefile_to_geodataframe(shapefile_folder):
    folder_path = os.path.join(os.path.dirname(__file__), shapefile_folder)
    gdf = gpd.read_file(folder_path)
    return gdf

def aggregate_state_senate_votes(geodataframe):
    geodataframe['Republican Votes'] = geodataframe.filter(regex=r'GCON\d+R[A-Z]+').sum(axis=1)
    geodataframe['Democrat Votes'] = geodataframe.filter(regex=r'GCON\d+D[A-Z]+').sum(axis=1)
    geodataframe = geodataframe.drop(columns=geodataframe.filter(like='GCON').columns)
    geodataframe = geodataframe.drop(columns=['COUNTYFP', 'COUNTYNM', 'PRECINCT'])
    return geodataframe

def aggregate_general_election_votes(geodataframe):
    column_mapping = {
        'G20PREDBID': 'Democrat Votes',
        'G20PRERTRU': 'Republican Votes'
    }
    columns_to_remove = {
        'NUMBER', 'JURSCODE', 'VOTESPRE'
    }
    geodataframe = geodataframe.rename(columns=column_mapping)
    geodataframe = geodataframe.drop(columns=geodataframe.filter(regex=r'G([A-Z0-9]+)').columns)
    geodataframe = geodataframe.drop(columns=columns_to_remove)
    return geodataframe

def filter_VAP(geodataframe):
    column_mapping = {
        'P0030001': 'Total VAP',
        'P0030003': 'White VAP',
        'P0030004': 'Black or African American VAP',
        'P0030005': 'American Indian and Alaska Native VAP',
        'P0030006': 'Asian VAP',
        'P0030007': 'Native Hawaiian and Other Pacific Islander VAP'
    }
    columns_to_remove = {
        "GEOID20", "SUMLEV", "LOGRECNO", "GEOID", "COUNTY"
    }   #Summary Level, Log Record Num
    geodataframe = geodataframe.rename(columns=column_mapping)
    geodataframe['Other VAP'] = geodataframe[['P0030008', 'P0030009']].sum(axis=1)
    #P0030008 is Other Race (Singular). P0030009 is Two or More Races.
    geodataframe = geodataframe.drop(columns=geodataframe.filter(regex=r'P003\d+').columns)
    geodataframe = geodataframe.drop(columns=columns_to_remove)
    return geodataframe

def process_csv(input_file, output_file_modify, output_file_remove):
    def shorten_number(value):
        return value[9:14]
    #1400000US24001000100 to 5 digit geoid of district 24001
    def modify_csv(input_file, output_file):
        with open(input_file, 'r') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            header = next(csv_reader)
            modified_data = []
            for row in csv_reader:
                row[0] = shorten_number(row[0])
                modified_data.append(row)
        with open(output_file, 'w', newline='') as new_csv_file:
            csv_writer = csv.writer(new_csv_file)
            csv_writer.writerow(header)
            csv_writer.writerows(modified_data)
        print(f"Modification complete. CSV file '{output_file}' created.")
    def remove_second_column(input_file, output_file):
        with open(input_file, 'r') as csvfile:
            reader = csv.reader(csvfile)
            rows = [row[:1] + row[2:] for row in reader]
        with open(output_file, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerows(rows)
        print(f"Second column removed. CSV file '{output_file}' created.")
    os.makedirs(os.path.dirname(output_file_modify), exist_ok=True)
    os.makedirs(os.path.dirname(output_file_remove), exist_ok=True)
    modify_csv(input_file, output_file_modify)
    remove_second_column(output_file_modify, output_file_remove)

def combine_geodataframe_and_csv(geodataframe, input_csv):
    csv_data = pd.read_csv(input_csv)
    merged_data = geodataframe.merge(csv_data, on='GEOID')
    return merged_data

def autorepair_geodataframe(geodataframe):
    geodataframe = geodataframe.to_crs('EPSG:3857')
    geodataframe['geometry'] = geodataframe['geometry'].make_valid()
    geodataframe['geometry'] = maup.resolve_overlaps(geodataframe['geometry'])
    geodataframe['geometry'] = maup.close_gaps(geodataframe['geometry'])
    return geodataframe

def create_and_save_dual_graph(geodataframe, output_json):
    geodataframe = geodataframe.to_crs('EPSG:3857')
    geodataframe['geometry'] = geodataframe['geometry'].buffer(0)
    dual_graph = Graph.from_geodataframe(geodataframe)
    dual_graph.to_json(output_json)
    print(f"Dual graph saved to {output_json}")

def add_temp_buffer(geodataframe):
    geodataframe['temp_geometry'] = geodataframe['geometry']
    geodataframe['geometry'] = geodataframe['geometry'].buffer(10)
    return geodataframe

def remove_temp_buffer(geodataframe):
    geodataframe['geometry'] = geodataframe['temp_geometry']
    geodataframe.drop('temp_geometry', axis=1, inplace=True)
    return geodataframe

def aggregate_properties(geodataframe1, geodataframe2):
    geodataframe1 = geodataframe1.to_crs('EPSG:3857')
    geodataframe2 = geodataframe2.to_crs('EPSG:3857')
    geodataframe1 = add_temp_buffer(geodataframe1)
    spatial_joined = gpd.sjoin(geodataframe1, geodataframe2, how='left', predicate='contains')
    aggregated_properties = spatial_joined.groupby('geometry').agg({
        'Total VAP'                                         :   'sum',
        'White VAP'                                         :   'sum',
        'Black or African American VAP'                     :   'sum',
        'American Indian and Alaska Native VAP'             :   'sum',
        'Asian VAP'                                         :   'sum',
        'Native Hawaiian and Other Pacific Islander VAP'    :   'sum',
        'Other VAP'                                         :   'sum'
    }).reset_index()
    merged_gdf = geodataframe1.merge(aggregated_properties, on='geometry', how='left')
    remove_temp_buffer(merged_gdf)
    return merged_gdf

if __name__ == "__main__":
    nc = gpd.read_file('NCCombined.geojson')
    nc.to_file('NCCombined.geojson', driver='GeoJSON')
    create_and_save_dual_graph(nc, 'NCGraph.json')
    wi = gpd.read_file('WICombined.geojson')
    wi.to_file('WICombined.geojson', driver='GeoJSON')
    create_and_save_dual_graph(wi, 'WIGraph.json')
    md = gpd.read_file('MDCombined.geojson')
    fixedMD = autorepair_geodataframe(md)
    graph = Graph.from_geodataframe(fixedMD)
    additional_edges = {
        (1667, 1695), 
        (1797, 1808), 
        (1668, 1695), 
        (1656, 1655), 
        (1654, 1662), 
        (1807, 1808)
        }
    graph.add_edges_from(additional_edges)
    graph.to_json('MDGraph.json')


def temp():
    nc_election_2022 = convert_shapefile_to_geodataframe('nc_2022_gen_prec')
    nc_census_data = convert_shapefile_to_geodataframe('nc_pl2020_b')
    nc_votes_2022 = aggregate_state_senate_votes(nc_election_2022)
    nc_vap = filter_VAP(nc_census_data)
    nc_vap.to_file('NCCensus.geojson', driver="GeoJSON")
    nc_votes_2022.to_file('NCElec.geojson', driver="GeoJSON")

    nc_vap = gpd.read_file('NCCensus.geojson')
    nc_votes_2022 = gpd.read_file('NCElec.geojson')
    new = aggregate_properties(nc_votes_2022, nc_vap)
    new.to_file('NCCombined.geojson', driver='GeoJSON')
    create_and_save_dual_graph(new, 'NCTestGraph.geojson') 
    #used https://mapshaper.org to fix some overlaps by snapping points

    snapped = gpd.read_file('NCCombined.json')
    fixed = autorepair_geodataframe(snapped)
    fixed.to_file('NCCombined.geojson', driver='GeoJSON')
    create_and_save_dual_graph(fixed, 'NCGraph.json')

    snapped = gpd.read_file('NCSimplified.json')
    snapped20 = gpd.read_file('NCSimplified20.json')
    fixed = autorepair_geodataframe(snapped)
    fixed20 = autorepair_geodataframe(snapped20)
    fixed.to_file('NCSimplified.geojson', driver='GeoJSON')
    fixed20.to_file('NCSimplified20.geojson', driver='GeoJSON')
    create_and_save_dual_graph(fixed, 'NCSimplifiedGraph.json')
    create_and_save_dual_graph(fixed20, 'NCSimplifiedGraph20.json')

    wi_election_2020 = convert_shapefile_to_geodataframe('wi_gen_20_prec')
    wi_census_data = convert_shapefile_to_geodataframe('wi_pl2020_b')
    wi_census_data.to_file('WICensus.geojson', driver="GeoJSON")
    wi_election_2020.to_file('WIElec.geojson', driver="GeoJSON")

    wi_vap = gpd.read_file('WICensus.geojson')
    wi_election_2020 = gpd.read_file('WIElec.geojson')
    wi_election_2020 = aggregate_general_election_votes(wi_election_2020)
    wi_vap = filter_VAP(wi_vap)
    wi_vap.to_file('WICensus.geojson', driver="GeoJSON")
    wi_election_2020.to_file('WIElec.geojson', driver="GeoJSON")

    wi_vap = gpd.read_file('WICensus.geojson')
    wi_election_2020 = gpd.read_file('WIElec.geojson')
    new = aggregate_properties(wi_election_2020, wi_vap)
    new.to_file('WICombined.geojson', driver='GeoJSON')
    create_and_save_dual_graph(new, 'WITestGraph.geojson')

    snapped = gpd.read_file('done_WICombined.geojson')
    fixed = autorepair_geodataframe(snapped)
    fixed.to_file('WICombined.geojson', driver='GeoJSON')
    create_and_save_dual_graph(fixed, 'WIGraph.json')

    snapped = gpd.read_file('WINoIslands.geojson')
    fixed = autorepair_geodataframe(snapped)
    fixed.to_file('WICombined.geojson', driver='GeoJSON')
    create_and_save_dual_graph(fixed, 'WIGraph.json')

    md_election_2020 = convert_shapefile_to_geodataframe('md_vest_20')
    md_census_data = convert_shapefile_to_geodataframe('md_pl2020_b')
    md_election_2020 = aggregate_general_election_votes(md_election_2020)
    md_census_data = filter_VAP(md_census_data)
    md_census_data.to_file('MDCensus.geojson', driver="GeoJSON")
    md_election_2020.to_file('MDElec.geojson', driver="GeoJSON")

    md_vap = gpd.read_file('MDCensus.geojson')
    md_votes_2020 = gpd.read_file('MDElec.geojson')
    new = aggregate_properties(md_votes_2020, md_vap)
    new.to_file('MDCombined.geojson', driver='GeoJSON')
    create_and_save_dual_graph(new, 'MDTestGraph.geojson') 

    snapped = gpd.read_file('MDCombined.geojson')
    snapped['geometry'] = snapped['geometry'].to_crs('EPSG:4326')
    snapped.to_file('MDCombined.json', driver='GeoJSON')

    geojson1 = gpd.read_file('MDCombined.json')
    geojson2 = gpd.read_file('MGGG.geojson')

    # Convert the "NAME" columns to lowercase for case-insensitive matching
    geojson1['NAME'] = geojson1['NAME'].str.upper()
    geojson2['NAME'] = geojson2['NAME'].str.upper()

    # Merge based on the lowercase "NAME" column
    merged_data = geojson1.merge(geojson2, left_on='NAME', right_on='NAME', how='inner')
    print(merged_data)
    # Keep only the desired columns (properties from the first file, and geometries from the second file)
    merged_data = merged_data[[ 
        "SEND", "Democrat Votes", "Republican Votes", "Total VAP", "White VAP",
        "Black or African American VAP", "American Indian and Alaska Native VAP", 
        "Asian VAP", "Native Hawaiian and Other Pacific Islander VAP", "Other VAP",
        "geometry_y"
        ]]
    
    merged_data = merged_data.rename(columns={'geometry_y' : 'geometry'})
    merged_data = gpd.GeoDataFrame(merged_data, geometry='geometry')

    print(merged_data)

    # Save the merged GeoDataFrame to a new GeoJSON file
    merged_data.to_file('output.geojson', driver='GeoJSON')

    md = gpd.read_file('fixed.json')
    fixedMD = autorepair_geodataframe(md)
    create_and_save_dual_graph(fixedMD, 'MDGraph.json')

    md = gpd.read_file('MDCombined.geojson')
    fixedMD = autorepair_geodataframe(md)
    graph = Graph.from_geodataframe(fixedMD)
    additional_edges = {
        (1667, 1695), 
        (1797, 1808), 
        (1668, 1695), 
        (1656, 1655), 
        (1654, 1662), 
        (1807, 1808)
        }
    graph.add_edges_from(additional_edges)
    graph.to_json('MDGraph.json')