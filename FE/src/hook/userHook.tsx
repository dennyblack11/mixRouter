import useSWR from "swr";
import { loginUser, readUser, readUserCookie } from "../api/userAPI";

export const userID = () => {
  const { data } = useSWR("/api/read-user-cookie", async () => {
    return await readUserCookie().then((res: any) => {
      return res?.data;
    });
  });

  return { data };
};

export const userData = () => {
  const storedID = localStorage.getItem("ID");
  const ID: string = storedID ? JSON.parse(storedID) : "";

  const { data, isLoading } = useSWR("/api/read-user", async () => {
    if (ID!) {
      return await readUser(ID!).then((res: any) => {
        console.log(res, "res");

        return res?.data;
      });
    }
  });

  return { data, isLoading };
};

export const userLogin = (token: string, email: string) => {
  const { data, isLoading, mutate } = useSWR("/api/login-user", async () => {
    return await loginUser({ token, email }).then((res: any) => {
      localStorage.setItem("ID", JSON.stringify(res?.data?._id));
      return res?.data;
    });
  });

  return { data, isLoading, mutate };
};
