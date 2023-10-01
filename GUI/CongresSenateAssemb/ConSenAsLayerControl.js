const WisconsinDistrictLayers = {
  "Wisconsin Congressional (Red)": wisconsinCongressionalDistrictsLayer,
  "Wisconsin Senate (Green)": wisconsinSenateDistrictsLayer,
  "Wisconsin Assembly (Blue)": wisconsinAssemblyDistrictsLayer,
};
const MarylandDistrictLayers = {
  "Maryland Congressional (Red)": marylandCongressionalDistrictsLayer,
  "Maryland Senate (Green)": marylandSenateDistrictsLayer,
  "Maryland Assembly (Blue)": marylandAssemblyDistrictsLayer,
};
const NCDistrictLayers = {
  "North Carolina Congressional (Red)": NCCongressionalDistrictsLayer,
  "North Carolina Senate (Green)": NCSenateDistrictsLayer,
  "North Carolina Assembly (Blue)": NCAssemblyDistrictsLayer,
};
// Create a layer control and add it to the map
L.control
  .layers(null, WisconsinDistrictLayers, {
    collapsed: false,
    label: "Wisconsin Districts",
  })
  .addTo(map);

L.control
  .layers(null, MarylandDistrictLayers, {
    collapsed: false,
    label: "Maryland Districts",
  })
  .addTo(map);

L.control
  .layers(null, NCDistrictLayers, {
    collapsed: false,
    label: "North Carolina",
  })
  .addTo(map);
