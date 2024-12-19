import axiosInstance from "./axiosInstance";

const serviceCall = (
  type,
  url,
  payload,
  timeout = 5000,
  responseType = "json",
  additionalOptions = {} // Accept additional options like headers
) => {
  const isGetRequest = type.toLowerCase() === "get";
  const request = {
    method: type.toLowerCase() || "get",
    url,
    ...(isGetRequest ? { params: payload } : { data: payload }), // Use `data` for non-GET requests
    timeout,
    responseType,
    ...additionalOptions, // Spread additional options (e.g., headers)
  };

  return axiosInstance(request);
};

export default serviceCall;
