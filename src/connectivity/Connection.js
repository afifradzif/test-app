import axios from "axios";

let ServerIP = "https://jsonplaceholder.typicode.com";

export default class Server {

    async getUsers() {

        return axios
          .get(ServerIP + "/users")
          .then(res => {
            // console.log("Server getUsers", res.data)
            return res.data;
    
          })
          .catch(error => {
    
            console.log("getUsers error: " + error)
    
          });
      }

}