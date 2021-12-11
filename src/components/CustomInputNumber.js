import React, { useState, useMemo } from "react";
import { useLongPress } from '../hooks';

const style = {
  root: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  value: {
    width: 48,
    height: 48,
    textAlign: "center",
    margin: "0 4px",
    padding: 0,
  },
  plus: {
    width: 48,
    height: 48,
    display: "flex",
    marginLeft: "4px",
    border: "lightblue solid",
    justifyContent: "center",
    alignItems: "center",
  },
  minus: {
    width: 48,
    height: 48,
    display: "flex",
    marginRight: "4px",
    border: "lightblue solid",
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    width: 48,
    height: 48,
    display: "flex",
    marginRight: "4px",
    border: "gray solid",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
};

const CustomInputNumber = (props) => {
  const { min, max, step, name, value, disabled, handleChange, handleBlur } =
    props;
  const [number, setNumber] = useState(value || 0);

  const handleValueChange = (event) => {
    const isNumber = !isNaN(event.target.value);
    if (event.target.name === name && isNumber) {
        const num = event.target.value === '' ? min : Number(event.target.value);
        const inRange = num >= 0 && num <= max;
        if (inRange) {
          setNumber(num);
          handleChange({name: event.target.name, value: num});
        }
    }
  };

  const handleValueBlur = (event) => {
    const isNumber = !isNaN(event.target.value);
    if (event.target.name === name && isNumber) {
      handleBlur({name: event.target.name, value: event.target.value});
    }
  };

  const handlePlus = () => {
    if (number < max && !disabled) {
      let tmp = number;
      tmp = tmp += step;
      setNumber(tmp);
      handleChange({name: name, value: tmp});
    }
  };

  const handleMinus = () => {
    if (number > min) {
      let tmp = number;
      tmp = tmp -= step;
      setNumber(tmp);
      handleChange({name: name, value: tmp});
    }
  };

  return (
    <div style={style.root}>
      <div
        style={number === min ? style.disabled : style.minus}
        {...useLongPress(handleMinus, 100)}
      >
        <a style={style.text}> - </a>
      </div>
      <input
        style={{ ...style.value, ...style.text }}
        type="text"
        name={name}
        value={number}
        // disabled={number === min || number === max}
        onBlur={(e) => handleValueBlur(e)}
        onChange={(e) => handleValueChange(e)}
      />
      <div
        style={disabled || number === max ? style.disabled : style.plus}
        {...useLongPress(handlePlus, 100)}
      >
        <a style={style.text}>+</a>
      </div>
    </div>
  );
};

export default CustomInputNumber;
