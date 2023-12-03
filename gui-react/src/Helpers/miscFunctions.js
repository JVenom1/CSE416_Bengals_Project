import "../App.css";
import "leaflet/dist/leaflet.css";

const miscFunc = () => ({
  changeMapSizeXbyY: (height = "100%", width = "50vw") => {
    const leafletContainer = document.querySelector(".leaflet-container");
    if (leafletContainer) {
      leafletContainer.style.width = width;
      leafletContainer.style.height = height;
    }
  },
});

export default miscFunc();
