import React, { useState, useMemo } from "react";

import Grid from "./Grid";
import CustomInputNumber from "./CustomInputNumber";

const Room = (props) => {
  const { disabled, id, max, onChange } = props;
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  useMemo(() => {
    onChange({ id: id, adult: adults, children: children });
  }, [adults, children]);

  const onBlur = (payload) => {
    if (payload.name.includes("adult-input-")) {
      setAdults(Number(payload.value));
    } else if (payload.name.includes("child-input-")) {
      setChildren(Number(payload.value));
    }
  };

  const handleChange = (payload) => {
    if (payload.name.includes("adult-input-")) {
      setAdults(Number(payload.value));
    } else if (payload.name.includes("child-input-")) {
      setChildren(Number(payload.value));
    }
  };

  return (
    <Grid>
      <Grid>
        <h2>房間: {adults + children}人</h2>
      </Grid>
      <Grid otherStyle={{ flexDirection: "row" }}>
        <Grid otherStyle={{ width: "50%" }}>
          <h3>大人</h3>
          <a style={{ color: "gray" }}>年齡20+</a>
        </Grid>
        <Grid
          otherStyle={{
            width: "50%",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <CustomInputNumber
            step={1}
            max={max - children}
            min={0}
            value={1}
            disabled={disabled}
            name={`adult-input-${id}`}
            handleChange={handleChange}
            handleBlur={onBlur}
          />
        </Grid>
      </Grid>
      <Grid otherStyle={{ flexDirection: "row" }}>
        <Grid otherStyle={{ width: "50%" }}>
          <h3>小孩</h3>
        </Grid>
        <Grid
          otherStyle={{
            width: "50%",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <CustomInputNumber
            step={1}
            max={max - adults}
            min={0}
            disabled={disabled}
            name={`child-input-${id}`}
            handleChange={handleChange}
            handleBlur={onBlur}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Room;
