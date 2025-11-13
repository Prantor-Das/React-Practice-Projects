import React, { useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [editState, setEditState] = useState({ field: null, value: "" });

  

  return <div>Timer</div>;
};

export default Timer;
