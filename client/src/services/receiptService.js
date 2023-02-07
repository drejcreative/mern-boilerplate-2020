import axios from "axios";

import { config } from "../config/config";

export class receiptService {
  static url = `${config.apiUrl}/receipts`;

  static async getReceipts() {
    try {
      const response = await axios.get(this.url);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  static async getReceiptsByHOF(hofId) {
    try {
      const response = await axios.get(this.url + "/" + hofId);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  static async addToReceipts(data) {
    try {
      const response = await axios.post(this.url, data);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
}
