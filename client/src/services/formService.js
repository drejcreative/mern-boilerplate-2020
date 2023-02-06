import axios from "axios";

import { config } from "../config/config";

export class formService {
  static url = `${config.apiUrl}/takhmeenform`;

  static async getForms() {
    try {
      const response = await axios.get(this.url);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  static async getFormbyFormNo(formNo) {
    try {
      const response = await axios.get(this.url + "/form/" + formNo);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  static async isFormExistByHOF(id) {
    try {
      const response = await axios.get(this.url + "/" + id);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  static async addToForms(data) {
    try {
      const response = await axios.post(this.url, data);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  static async updateForm(data) {
    try {
      await axios.put(this.url, data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async deleteForm(id) {
    try {
      await axios.delete(this.url, { data: { id } });
      return id;
    } catch (error) {
      return error;
    }
  }
}
