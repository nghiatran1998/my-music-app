import axios from "axios";
import { MUSICS_LIST_URL } from "../constants/urls";

const apiCaller = (endpoint, method, data) => {
  return axios({
    method: method,
    url: `${MUSICS_LIST_URL}/${endpoint}`,
    data: data,
  });
};

export default apiCaller;
