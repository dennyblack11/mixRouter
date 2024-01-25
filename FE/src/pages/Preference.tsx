import { useEffect, useState } from "react";
import { addUserName, addUserPreference, updateStarted } from "../api/userAPI";
import { useNavigate } from "react-router-dom";

export const Preference = () => {
  const [name, setName] = useState("");

  const ID: string = JSON.parse(localStorage.getItem("ID")!);

  const navigate = useNavigate();

  const [pref, setPref] = useState([
    {
      text: "Web Dev",
      selected: true,
      id: 1,
    },
    {
      text: "React",
      selected: true,
      id: 2,
    },
    {
      text: "Angular",
      selected: true,
      id: 3,
    },
    {
      text: "Laravel",
      selected: true,
      id: 4,
    },
    {
      text: "SASS",
      selected: false,
      id: 5,
    },
    {
      text: "Tailwind",
      selected: true,
      id: 6,
    },
  ]);

  return (
    <div>
      <div className="w-full h-screen flex items-center flex-col gap-9">
        <div className="h-[30%] flex justify-center items-end">
          <div className="">
            <div>User name</div>
            <input
              id="email"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              className="pl-3 block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="h-[50%] flex justify-center items-start gap-4">
          {pref.map((el) => (
            <div
              onClick={() => {
                const foundData: any = pref.find((props) => el.id === props.id);

                foundData!.selected = !foundData.selected;

                setPref((pref) => [...pref]);
              }}
              className={`p-4 py-2 cursor-pointer rounded-md  ${
                el.selected ? "bg-violet-700 text-white " : "border"
              }`}
            >
              {el.text}
            </div>
          ))}
        </div>

        <center
          className="bg-purple-700 text-white mt-10 rounded-lg w-[400px] h-[40px] flex items-center justify-center cursor-pointer"
          onClick={() => {
            addUserName({ name }, ID);
            addUserPreference(
              { preference: pref.filter((el) => el.selected === true) },
              ID
            ).then((res) => {
              console.log("res", res);
            });
            updateStarted(ID);

            setTimeout(() => {
              navigate("/");
            }, 1000);
          }}
        >
          Submit
        </center>
      </div>
    </div>
  );
};
