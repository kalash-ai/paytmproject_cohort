import { useState } from "react";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { Button } from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarnng";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"SignIn"} />
          <SubHeading label={"Enter Your Details to SignIn"} />

          <InputBox
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            onchange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"password"}
            onchange={(e) => setpassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Sign In"} />
          </div>
          <BottomWarning
            label={"Dont Have An Account"}
            buttonText={"SignUp"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
