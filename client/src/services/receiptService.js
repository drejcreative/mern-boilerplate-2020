import axios from "axios";

import { config } from "../config/config";

export class receiptService {
  static url = `${config.apiUrl}/receipts`;

  static async getReceipts() {
    try {
      const response = await axios.get(this.url);
      return { data: response.data.data, isOK: response.statusText === "OK" };
    } catch (error) {
      return error;
    }
  }

  static async getReceiptsByHOF(hofId) {
    try {
      const response = await axios.get(this.url + "/" + hofId);
      return { data: response.data.data, isOK: response.statusText === "OK" };
    } catch (error) {
      return error;
    }
  }

  static async addToReceipts(data) {
    try {
      const response = await axios.post(this.url, data);
      return {
        data: response.data.data,
        isOK: response.statusText === "Created",
      };
    } catch (error) {
      return error;
    }
  }
}
