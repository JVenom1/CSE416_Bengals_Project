import geopandas as gpd
import random
from shapely.geometry import shape, Polygon
import pandas as pd

# Load the boundary GeoJSON
fileName = "WisconsinOutline"
num_districts = 8
total_population = 6165000
boundary_data = gpd.read_file(fileName + ".geojson")
# file names: MarylandOutline, WisconsinOutline, NCOutline
# population (million) mary: 6165000; of Wisconsin: 5896000; NA: 10550000
# districts
#   Maryland:  (C)8,  (S)47,  (A)141;
#   Wisconsin: (C)8,  (S)33,  (A)99;
#   NA:        (C)14, (S)50,  (A)120


# Initialize districts with random polygons within the boundary
districts = []

max_attempts = 100  # Maximum number of attempts to generate a non-overlapping polygon

for i in range(num_districts):
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
                # Check if the new polygon overlaps with any existing district
                overlaps = False
                for existing_district in districts:
                    if clipped_polygon.intersects(existing_district["geometry"]):
                        overlaps = True
                        break

                if not overlaps:
                    districts.append(
                        {
                            "geometry": shape(clipped_polygon),
                            "population": 0,  # Initialize with zero population
                        }
                    )
                    break

# Calculate the target population for each district
target_population = total_population / num_districts

# ...

# Assign random population to districts
for i in range(num_districts - 1):
    remaining_districts = num_districts - i
    max_population = total_population - sum(
        district["population"] for district in districts
    )
    max_population_per_district = max_population / remaining_districts
    district = random.choice(districts)

    while district["population"] >= max_population_per_district:
        district = random.choice(districts)

    # Convert max_population_per_district to an integer
    max_population_per_district_int = int(max_population_per_district)

    district["population"] += random.randint(
        1, max_population_per_district_int - district["population"]
    )

# ...

# Assign the remaining population to the last district
districts[-1]["population"] = total_population - sum(
    district["population"] for district in districts
)

# Create a union polygon of all districts
union_polygon = shape(districts[0]["geometry"])
for district in districts[1:]:
    union_polygon = union_polygon.union(shape(district["geometry"]))

# Create GeoJSON features for the districts
district_features = []
for i, district in enumerate(districts):
    district_features.append(
        {
            "type": "Feature",
            "properties": {"DistrictID": i + 1, "Population": district["population"]},
            "geometry": district["geometry"],
        }
    )

# Create a GeoDataFrame that includes the union polygon and district polygons
result_geojson = {"type": "FeatureCollection", "features": district_features}
result_gdf = gpd.GeoDataFrame.from_features(result_geojson)

# Merge the boundary GeoDataFrame and the result GeoDataFrame
merged_gdf = pd.concat([boundary_data, result_gdf], ignore_index=True)

# Save the merged GeoJSON with the boundary and districts
merged_gdf.to_file(f"{fileName}RandData.geojson", driver="GeoJSON")

print(f"Merged district plan saved to {fileName}RandData.geojson")
