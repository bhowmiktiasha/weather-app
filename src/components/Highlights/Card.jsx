import React from "react";
import { cn } from "../../utils/utils";

function Card({ children, className }) {
  //  const card = {
  //    background: "rgb(25 32 45)",
  //    color: "#fff",
  //  };
  return (
    <div className={cn("bg-[#19202d] text-white", className)}>{children}</div>
  );
}

export default Card;
