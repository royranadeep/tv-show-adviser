import axios from "axios";
import { FAKE_POPULARS, FAKE_RECOMMENDATIONS } from "./fake_data";
import { BASE_URL, API_KEY_PARAM } from "../config";

export class TVShowAPI {
  static async fetchPopulars() {
    //perform the request
    // const response = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`);
    // console.log(response.data.results);
    //return response.data.result;
    return FAKE_POPULARS;
  }

  static async fetchRecommendations(tvShowId) {
    //console.log(tvShowId);
    //perform the request
    // const response = await axios.get(
    //   `${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`
    // );
    // console.log(response.data.results);
    // return response.data.result;
    return FAKE_RECOMMENDATIONS;
  }

  static async fetchByTitle(title) {
    const response = await axios.get(
      `${BASE_URL}search/tv${API_KEY_PARAM}&query=${title}`
    );
    return response.data.results;
  }
}
