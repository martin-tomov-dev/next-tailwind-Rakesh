import axios from "axios";
import TokenInjectingInterceptor from "./TokenInjectingInterceptor";

const axiosInstance = axios.create();
const interceptor = new TokenInjectingInterceptor();

axiosInstance.interceptors.request.use(
  interceptor.injectToken.bind(interceptor)
);

export const putProfile = async (data) => {
  const result = await axiosInstance.put("/api/profile", data);

  return result;
};

export const swrFetcher = async (key) => {
  const result = await axiosInstance.get(key);
  return result.data;
};

export const getTitles = async (query) => {
  try {
    const result = await axiosInstance.get(
      `https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=${query}`
    );
    return [result.data.results, null];
  } catch (err) {
    return [null, err];
  }
};
