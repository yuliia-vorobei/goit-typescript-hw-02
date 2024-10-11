import axios from "axios";
import { Picture } from "./components/App/App";

const API_KEY = "aukwGX4CUI5OaJLUsXCrXhvuOYH3GrX46WqCuKnr0j4";
axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;
axios.defaults.params = {
  orientation: "landscape",
  per_page: 12,
};

export interface GetPhotosResponse {
  results: Picture[];
  total_pages: number;
}

export const getPhotos = async (
  query: string,
  page: number
): Promise<GetPhotosResponse> => {
  const response = await axios.get(
    `/search/photos?query=${query}&page=${page}`
  );
  console.log(response.data);

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};
