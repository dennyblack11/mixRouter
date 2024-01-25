import { FC, PropsWithChildren } from "react";
import { userData } from "../hook/userHook";
import { Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export const MixedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = userData();

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen absolute top-0 bg-white">
          <ClipLoader size={40} color="#4f46e5" />
        </div>
      ) : data?.started ? (
        <div>{children} </div>
      ) : (
        <Navigate to="/pref" />
      )}
    </div>
  );
};
