import serviceCall from "../serviceCall";
import { PROPERTY, USERS, REPAIR, AUTH } from "../endpoints";

export const fetchUsers = async (page) => {
  const url = USERS;
  const payload = {
    language: "en-US",
    page,
  };

  try {
    const response = await serviceCall("GET", url, payload);
    const { results: users } = response.data;
    return Promise.resolve(users);
  } catch (err) {
    return await Promise.reject(err);
  }
};

export const fetchUserDeatails = async (id) => {
  console.log("method fetchUserDeatails -- started");
  const url = USERS + `${id}`;

  try {
    const response = await serviceCall("GET", url, null);
    console.log("method fetchUserDeatails -- ended");

    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    console.log("method fetchUserDeatails -- failed");

    return await Promise.reject(err);
  }
};

export const fetchUserList = async () => {
  console.log("method fetchUserList -- started");
  const url = USERS;

  try {
    const response = await serviceCall("GET", url, null);
    console.log("method fetchUserList -- ended");

    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    console.log("method fetchUserList -- failed");

    return await Promise.reject(err);
  }
};

export const validateLoginData = async (loginData) => {
  const url = AUTH;

  try {
    const response = await serviceCall("POST", url, loginData, 5000, "json", {
      headers: {
        "Content-Type": "application/json", // JSON content type
      },
    });
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    return await Promise.reject(err);
  }
};

export const createUser = async (user) => {
  const url = USERS;

  try {
    const response = await serviceCall("POST", url, user, 5000, "json", {
      headers: {
        "Content-Type": "application/json", // JSON content type
      },
    });
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    console.error("Error in createUser:", err);
    return Promise.reject(err);
  }
};

export const createProperty = async (property) => {
  const url = PROPERTY;

  try {
    const response = await serviceCall("POST", url, property, 5000, "json", {
      headers: {
        "Content-Type": "application/json", // JSON content type
      },
    });
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    console.error("Error in createUser:", err);
    return Promise.reject(err);
  }
};

export const updateProperty = async (property) => {
  const url = PROPERTY + `${property.propertyIDNumber}`;

  try {
    const response = await serviceCall("PUT", url, property, 5000, "json", {
      headers: {
        "Content-Type": "application/json", // JSON content type
      },
    });
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    console.error("Error in updateProperty:", err);
    return Promise.reject(err);
  }
};

export const removeProperty = async (property) => {
  const url = PROPERTY + `${property.propertyIDNumber}`;

  try {
    const response = await serviceCall("DELETE", url, property, 5000, "json", {
      headers: {
        "Content-Type": "application/json", // JSON content type
      },
    });
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    console.error("Error in deleteProperty:", err);
    return Promise.reject(err);
  }
};

export const createRepair = async (property) => {
  const url = REPAIR;

  try {
    const response = await serviceCall("POST", url, property, 5000, "json", {
      headers: {
        "Content-Type": "application/json", // JSON content type
      },
    });
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    console.error("Error in createUser:", err);
    return Promise.reject(err);
  }
};

export const fetchRepairsList = async () => {
  console.log("method fetchRepairsList -- started");
  const url = REPAIR;

  try {
    const response = await serviceCall("GET", url, null);
    console.log("method fetchRepairsList -- ended");

    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    console.log("method fetchRepairsList -- failed");

    return await Promise.reject(err);
  }
};

export const fetchRepairsByProp = async (propId) => {
  console.log("method fetchRepairsByProp -- started");
  const url = REPAIR + `property/${propId}`;

  try {
    const response = await serviceCall("GET", url, null);
    console.log("method fetchRepairsByProp -- ended");

    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    console.log("method fetchRepairsByProp -- failed");

    return await Promise.reject(err);
  }
};

export const fetchRepairDeatails = async (id) => {
  console.log("method fetchRepairDeatails -- started");
  const url = REPAIR + `${id}`;

  try {
    const response = await serviceCall("GET", url, null);
    console.log("method fetchRepairDeatails -- ended");

    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data,
    };
  } catch (err) {
    console.log("method fetchRepairDeatails -- failed");

    return await Promise.reject(err);
  }
};
