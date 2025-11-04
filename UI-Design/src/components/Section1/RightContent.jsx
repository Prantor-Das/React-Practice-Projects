import React from "react";
import RightCard from "./RightCard";

const RightContent = (props) => {
  // safe optional chaining to avoid reading .color on undefined
  console.log(props.users?.color);

  const users = Array.isArray(props.users) ? props.users : [];

  return (
    <div
      id="right"
      className="h-full flex rounded-4xl overflow-x-auto flex-nowrap gap-10 p-6 w-2/3"
    >
      {users.map(function (elem, idx) {
        return (
          <RightCard
            key={idx}
            color={elem.color}
            id={idx}
            img={elem.img}
            tag={elem.tag}
          />
        );
      })}
    </div>
  );
};

export default RightContent;
