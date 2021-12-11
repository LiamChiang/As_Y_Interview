import React from "react";
import { RoomAllocation } from "../components";

const Main = () => {

  return (
    <RoomAllocation guest={10} room={3} onChange={(e) => console.log(e)} />
  );
};

export default Main;
