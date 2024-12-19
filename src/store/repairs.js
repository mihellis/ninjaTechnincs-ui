import { userActions } from "./user-slice";
import {
  createRepair,
  fetchRepairsByProp,
} from "../network/fetchFunctions/fetchFunctions.js";

export const getRepairsByProp = (propId) => {
  return async (dispatch) => {
    const getRepairs = async () => {
      const response = await fetchRepairsByProp(propId);

      if (!response.ok) {
        throw new Error("Could not fetch repair data!");
      }

      const repairData = await response.json();

      console.warn("rrreeakjgasjosagf data", repairData);
      return repairData;
    };

    try {
      const repairData = await getRepairs();
      dispatch(
        userActions.getRepairsByPropId({
          propertyIDNumber: propId,
          repairs: repairData,
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

export const postRepair = (repair) => {
  return async (dispatch) => {
    const create = async () => {
      const response = await createRepair(repair);

      if (!response.ok) {
        throw new Error("Could not create repair!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const repairData = await create();
      console.warn(repairData);
      //   dispatch(
      //     userActions.createRepair({
      //       properties: repairData,
      //     })
      //   );
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

// export const deleteRepair = (repair, propertyId) => {
//   return async (dispatch) => {
//     const remove = async () => {
//       console.warn("repair", repair);
//       const response = await removeRepair(repair);

//       if (!response.ok) {
//         throw new Error("Could not fetch cart data!");
//       }

//       // const data = await response.json();
//       return repair;
//     };

//     try {
//       const repairData = await remove();
//       dispatch(
//         userActions.removeRepair({
//           propertyIDNumber: repair,
//           repairId: propertyId,
//         })
//       );
//     } catch (error) {
//       console.error("Error in postUser:", error);
//       // dispatch(
//       //     uiActions.showNotification({
//       //         status: 'error',
//       //         title: 'Error!',
//       //         message: 'Fetching cart data failed!',
//       //     })
//       // );
//     }
//   };
// };
