import geopandas as gpd
import random
from shapely.geometry import shape, Polygon
import pandas as pd

# Define the number of plans you want to create
num_plans = 1000  # Increase the number of plans

# Load the boundary GeoJSON
fileName = "MarylandOutline"
total_population = 6165000
boundary_data = gpd.read_file(fileName + ".geojson")

# Initialize an empty list to store all district plans
all_districts = []

# Define the number of districts per plan (consistent across all plans)
num_districts_per_plan = 8  # You can adjust this number as needed

# Calculate the population target for each district
target_population = total_population / num_districts_per_plan

for plan_num in range(num_plans):
    # Initialize districts with random polygons within the boundary for each plan
    districts = []

    max_attempts = 100  # Maximum number of attempts to generate a non-overlapping polygon

    for i in range(num_districts_per_plan):
        for _ in range(max_attempts):
            # Generate random points within the boundary
            minx, miny, maxx, maxy = boundary_data.total_bounds
            random_points = [
                (random.uniform(minx, maxx), random.uniform(miny, maxy)) for _ in range(10)
            ]
            polygon = Polygon(random_points)

            # Check if the generated polygon is valid and intersects the boundary
            if polygon.is_valid and polygon.intersects(boundary_data.geometry.iloc[0]):
                clipped_polygon = polygon.intersection(boundary_data.geometry.iloc[0])

                # Check if the clipped polygon has a valid area
                if clipped_polygon.is_valid and clipped_polygon.area > 0:
                    districts.append(
                        {
                            "geometry": shape(clipped_polygon),
                            "population": 0,  # Initialize with zero population
                        }
                    )
                    break

    # Assign random population to districts in this plan
    for district in districts:
        max_population_per_district_int = int(target_population)
        district["population"] = random.randint(1, max_population_per_district_int)

    # Append the districts for this plan to the list of all districts
    all_districts.extend(districts)

# Create GeoJSON features for all district plans
all_district_features = []

for i, district in enumerate(all_districts):
    all_district_features.append(
        {
            "type": "Feature",
            "properties": {"PlanID": i // num_districts_per_plan + 1, "DistrictID": i % num_districts_per_plan + 1, "Population": district["population"]},
            "geometry": district["geometry"],
        }
    )

# Create a GeoDataFrame that includes the union polygon and district polygons for all plans
result_geojson = {"type": "FeatureCollection", "features": all_district_features}
result_gdf = gpd.GeoDataFrame.from_features(result_geojson)

# Merge the boundary GeoDataFrame and the result GeoDataFrame
merged_gdf = pd.concat([boundary_data, result_gdf], ignore_index=True)

# Save the merged GeoJSON with the boundary and districts for all plans
merged_gdf.to_file(f"{fileName}MultiplePlans.geojson", driver="GeoJSON")

print(f"Merged district plans saved to {fileName}MultiplePlans.geojson")
