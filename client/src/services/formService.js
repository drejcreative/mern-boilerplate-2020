import axios from "axios";

import { config } from "../config/config";

export class formService {
  static url = `${config.apiUrl}/takhmeenform`;

  static async getForms() {
    try {
      const response = await axios.get(this.url);
      return { data: response.data.data, isOK: response.statusText === "OK" };
    } catch (error) {
      return error;
    }
  }

  static async getFormbyFormNo(formNo) {
    try {
      const response = await axios.get(this.url + "/form/" + formNo);
      return { data: response.data.data, isOK: response.statusText === "OK" };
    } catch (error) {
      return error;
    }
  }

  static async isFormExistByHOF(id) {
    try {
      const response = await axios.get(this.url + "/" + id);
      return { data: response.data.data, isOK: response.statusText === "OK" };
    } catch (error) {
      return error;
    }
  }

  static async addToForms(data) {
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

  static async updateForm(data) {
    try {
      const response = await axios.put(this.url, data);
      return { data: response.data.data, isOK: response.statusText === "OK" };
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
