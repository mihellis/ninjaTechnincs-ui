// import { uiActions } from './ui-slice';
import { userActions } from "./user-slice";
import {
  createUser,
  fetchUserDeatails,
  validateLoginData,
} from "../network/fetchFunctions/fetchFunctions.js";

export const fetchUser = (id) => {
  return async (dispatch) => {
    const getUser = async () => {
      // user: { name: 'mike', password: '44444' };
      const response = await fetchUserDeatails(id);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const userData = await response.json();

      return userData;
    };

    try {
      const user = await getUser();
      console.warn("ddddddddddddddddddddgasbvvv home", user);
      dispatch(
        userActions.setUser({
          user: user,
          properties: user.properties,
        })
      );
    } catch (error) {
      console.log(error);
      // dispatch(
      //     uiActions.showNotification({
      //         status: 'error',
      //         title: 'Error!',
      //         message: 'Fetching cart data failed!',
      //     })
      // );
    }
  };
};

export const validateUser = (data) => {
  return async (dispatch) => {
    const login = async () => {
      // user: { name: 'mike', password: '44444' };
      const response = await validateLoginData(data);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const userData = await response.json();

      return userData;
    };

    try {
      const loginData = await login();
      localStorage.setItem("token", loginData.token);
      console.warn(loginData);
      dispatch(
        userActions.login({
          user: loginData.user,
          properties: loginData.user.properties,
        })
      );
    } catch (error) {
      console.log(error);
      // dispatch(
      //     uiActions.showNotification({
      //         status: 'error',
      //         title: 'Error!',
      //         message: 'Fetching cart data failed!',
      //     })
      // );
    }
  };
};

export const postUser = (user) => {
  return async (dispatch) => {
    const login = async () => {
      // user: { name: 'mike', password: '44444' };
      const response = await createUser(user);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      console.warn(response);

      return data;
    };

    try {
      const userData = await login();
      dispatch(
        userActions.login({
          user: userData,
          properties: [],
        })
      );
    } catch (error) {
      console.error("Error in postUser:", error);
      // dispatch(
      //     uiActions.showNotification({
      //         status: 'error',
      //         title: 'Error!',
      //         message: 'Fetching cart data failed!',
      //     })
      // );
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch(userActions.logout());
    } catch (error) {
      console.error("Error in postUser:", error);
      // dispatch(
      //     uiActions.showNotification({
      //         status: 'error',
      //         title: 'Error!',
      //         message: 'Fetching cart data failed!',
      //     })
      // );
    }
  };
};
