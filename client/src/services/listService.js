import axios from 'axios';

import { config } from "../config/config"

export class listService {
  static url = `${config.apiUrl}/list`;

  static async fetchList() {
    try {
      const response = await axios.get(this.url);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  static async addToList(data) {
    try {
      const response = await axios.post(this.url, data);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  static async updateList(data) {
    try {
      await axios.put(this.url, data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async deleteFromList(id) {
    try {
      await axios.delete(this.url, { data: { id } });
      return id;
    } catch (error) {
      return error;
    }
  }
}