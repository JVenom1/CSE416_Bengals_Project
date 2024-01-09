import axios from "axios";

// this is the main server
export default axios.create({
  baseURL: "http://localhost:8080/server/BengalsAPI",
});

// IP 130.245.192.6
// this is the test server
// const tempServer = `https://six-masks-bow.loca.lt/server/`;
// export default axios.create({
//   baseURL: `${tempServer}BengalsAPI`,
// });
