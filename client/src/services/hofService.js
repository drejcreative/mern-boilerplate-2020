import axios from "axios";

import { config } from "../config/config";

export class hofService {
  static url = `${config.apiUrl}/hof`;

  static async getMembersByHOF(id) {
    try {
      const response = await axios.get(this.url + "/" + id);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
}
