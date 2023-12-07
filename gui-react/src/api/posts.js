import axios from "axios";

// this is the main server
// export default axios.create({
//   baseURL: "http://localhost:8080/server/BengalsAPI",
// });

// this is the test server
export default axios.create({
  baseURL: "https://flat-banks-flow.loca.lt/server/BengalsAPI",
});
