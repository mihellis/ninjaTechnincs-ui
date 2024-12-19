import { userActions } from "./user-slice";
import {
  createProperty,
  updateProperty,
  removeProperty,
} from "../network/fetchFunctions/fetchFunctions.js";

export const deleteProperty = (property) => {
  return async (dispatch) => {
    const remove = async () => {
      console.warn("proepe", property);
      const response = await removeProperty(property);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      // const data = await response.json();
      return property;
    };

    try {
      const propertyData = await remove();
      dispatch(
        userActions.removeProperty({
          properties: propertyData,
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

export const putProperty = (property) => {
  return async (dispatch) => {
    const update = async () => {
      const response = await updateProperty(property);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const propertyData = await update();
      dispatch(
        userActions.editProperty({
          properties: propertyData,
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

export const postProperty = (property) => {
  return async (dispatch) => {
    const create = async () => {
      const response = await createProperty(property);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const propertyData = await create();
      dispatch(
        userActions.createProperty({
          properties: propertyData,
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
