import axios from 'axios'
import {handleError} from "@/helpers/ApiHelper";

export class AuthService {
  async login(payload) {
    return await axios.post(`${process.env.VUE_APP_API_BASE_URL}/auth/login`, payload)
      .then((res) => {
        return res.data;
      }).catch(e => {
        return handleError(e);
      })
  }

  async register(payload) {
    return await axios.post(`${process.env.VUE_APP_API_BASE_URL}/auth/register`, payload)
      .then((res) => {
        return res.data;
      }).catch(e => {
        return handleError(e);
      })
  }
}
