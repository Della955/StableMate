import { useContext } from "react";
import { userContext } from "../App";

export const ListPage = () => {
    const { user } = useContext(userContext);
    return (
      <div>
        <h1>This is the list page</h1>
        <h3>View your current lists</h3>
        <button>Add task to list</button>
      </div>
    );
  };