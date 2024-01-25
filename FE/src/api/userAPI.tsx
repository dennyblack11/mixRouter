import axios, { AxiosResponse } from "axios";

const URL: string = "http://localhost:4000/api";

export const createUser = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-user`, data)
      .then((res: AxiosResponse<any, any>) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addUserName = async (data: {}, ID: string) => {
  try {
    return await axios
      .patch(`${URL}/add-user-name/${ID}`, data)
      .then((res: AxiosResponse<any, any>) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addUserPreference = async (data: {}, ID: string) => {
  try {
    return await axios
      .patch(`${URL}/add-user-pref/${ID}`, data)
      .then((res: AxiosResponse<any, any>) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verifyUser = async (data: {}, ID: string) => {
  try {
    return await axios
      .patch(`${URL}/verify-user/${ID}`, data)
      .then((res: AxiosResponse<any, any>) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateStarted = async (ID: string) => {
  try {
    return await axios
      .patch(`${URL}/update-started/${ID}`)
      .then((res: AxiosResponse<any, any>) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logoutUser = async () => {
  try {
    return await axios
      .get(`${URL}/logout-user`, { withCredentials: true })
      .then((res: AxiosResponse<any, any>) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUser = async (data: {}) => {
  try {
    return await axios
      .patch(`${URL}/login-user`, data, { withCredentials: true })
      .then((res: AxiosResponse<any, any>) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const readUserCookie = async () => {
  try {
    return await axios
      .get(`${URL}/read-user-cookie`, { withCredentials: true })
      .then((res: AxiosResponse<any, any>) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const readUser = async (ID: string) => {
  try {
    return await axios
      .get(`${URL}/read-user/${ID}`)
      .then((res: AxiosResponse<any, any>) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};
