import { useContext } from "react";
import { userContext } from "../App";
import Navbar from "./Navbar";

export const HomePage = () => {
  const { user } = useContext(userContext);
  return (
    <div>
      <h1>Welcome {user ? user : null}</h1>
      <h3>Here is your 5 day weather outlook</h3>
    </div>
  );
};