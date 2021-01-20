import { store } from "../store";
import { IUserResponse } from "../commonTypes";


export const getUserFromStore = () => {
  const userData: IUserResponse = store.getState().user;
  return userData.data;
};


