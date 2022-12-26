import React from "react";
import { Radio } from "antd";

const ToggleRole = () => {
  return (
    <div>
      <Radio.Group>
        <Radio.Button value="Student">Student</Radio.Button>
        <Radio.Button value="Teacher">Teacher</Radio.Button>
        <Radio.Button value="Manager">Manager</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default ToggleRole;
