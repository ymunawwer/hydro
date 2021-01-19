//import * as Cookies from "js-cookie";
import endpoint from "../../apiUtil";
import { getUserFromStore } from "./../../utils/roleHelper";
import history from "../../history";

const axiosInterceptor = () => {
  try {
    endpoint.interceptors.request.use((config) => {
      const user = getUserFromStore();
      if (user && user.accessToken) {
        config.headers.Authorization = "Bearer " + user.accessToken;
      } else {
        delete config.headers.Authorization;
      }
      config.headers.authkey = user ? user.authkey : config.headers.authkey;
      config.headers.source = "Web";
      return config;
    });
    endpoint.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (401 === error.response.status) {
          history.push("/login");
        } else {
          return Promise.reject(error);
        }
      }
    );
  } catch (error) {}
};

export default axiosInterceptor;
