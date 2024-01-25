import { FC, PropsWithChildren } from "react";
import { userData } from "../hook/userHook";
import { Navigate } from "react-router-dom";
import Cliploader from "react-spinners/ClipLoader";

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading }: any = userData();

  console.log("data", data);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <Cliploader size={40} color="#4f46e5" />
        </div>
      ) : data && data?.verified ? (
        <div>{children}</div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
