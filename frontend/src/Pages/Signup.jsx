import axios from "axios";
import { useState } from "react";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { Button } from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarnng";

export const Signup = () => {
  const [FirstName, setfirstname] = useState("");
  const [LastName, setLastame] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Signup"} />
          <SubHeading label={"Enter Your Information to Signup"} />

          <InputBox
            onchange={(e) => {
              setfirstname(e.target.value);
            }}
            placeholder={"Enter Your First Name"}
          />
          <InputBox
            onchange={(e) => {
              setLastame(e.target.value);
            }}
            placeholder={"Enter Your Last Name"}
          />

          <InputBox
            onchange={(e) => {
              setusername(e.target.value);
            }}
            placeholder={"Enter your username"}
          />

          <InputBox
            onchange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder={"Enter a password"}
          />

          <div className="pt-4">
           
            <Button onClick={async () => {
        await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              FirstName,
              LastName,
              password
            });
            
          }} label={"Sign up"}  />
          </div>
          <BottomWarning
            label={"Already Have An Account"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
