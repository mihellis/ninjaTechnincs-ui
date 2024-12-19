import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores logged-in user data
  properties: [], // Stores user's properties
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.properties = action.payload.properties;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.properties = action.payload.properties;
    },
    logout: (state) => {
      state.user = null;
      state.properties = [];
    },
    editProperty: (state, action) => {
      // properties.map((p) => (p.id === editingId ? { ...p, ...formData } : p))
      console.warn("update", action.payload.properties.propertyIDNumber);
      console.warn("update", ...state.properties);
      const updatedProperties = state.properties.map((p) =>
        p.propertyIDNumber === action.payload.properties.propertyIDNumber
          ? { ...action.payload.properties }
          : p
      );

      state.properties = updatedProperties;
    },
    createProperty: (state, action) => {
      state.properties = [action.payload.properties, ...state.properties];
    },
    removeProperty: (state, action) => {
      state.properties = state.properties.filter(
        (p) => p.propertyIDNumber !== action.payload.properties.propertyIDNumber
      );
    },
    createRepair: (state, action) => {
      const { propertyIDNumber, repair } = action.payload;

      // Find the property that needs the repair update
      const updatedProperties = state.properties.map((property) =>
        property.propertyIDNumber === propertyIDNumber
          ? {
              ...property,
              repairs: [...property.repairs, repair], // Add the new repair immutably
            }
          : property
      );

      state.properties = updatedProperties;
    },
    deleteeRepair: (state, action) => {
      const { propertyIDNumber, repairId } = action.payload;

      // Find the property that needs the repair update
      const updatedProperties = state.properties.map((property) =>
        property.propertyIDNumber === propertyIDNumber
          ? {
              ...property,
              repairs: property.repairs.filter((r) => r.id !== repairId), // Add the new repair immutably
            }
          : property
      );

      state.properties = updatedProperties;
    },

    getRepairsByPropId: (state, action) => {
      const { propertyIDNumber, repairs } = action.payload;

      // Find the property that needs the repair update
      const updatedProperties = state.properties.map((property) =>
        property.propertyIDNumber === propertyIDNumber
          ? {
              ...property,
              repairs: [...repairs], // Add the new repair immutably
            }
          : property
      );

      state.properties = updatedProperties;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
