import axios from 'axios'
import {handleError} from "@/helpers/ApiHelper";

export class UserService {

  async profile() {
    return await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
      }
    })
      .then((res) => {
        return res.data;
      }).catch(e => {
        return handleError(e);
      })
  }
}
