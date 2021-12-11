import React, { useState, useMemo, useEffect } from "react";
import Room from "./Room";
import Grid from "./Grid";
import _cloneDeep from "lodash/cloneDeep";
import _forEach from "lodash/forEach";

const RoomAllocation = (props) => {
  const { guest, room, onChange } = props;
  const [arranged, setArranged] = useState(room || 0);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const res = [...Array(room)].map((item, i) => {
      return { id: `room-${i}`, adult: 1, child: 0 };
    });
    setRooms(res);
  }, []);

  useMemo(() => {
    let totalCount = 0;
    _forEach(rooms, (item) => {
      totalCount += item.adult + item.child;
    });
    setArranged(totalCount);
  }, [rooms]);

  const handleArrangedChange = (payload) => {
    const tmpRooms = rooms.map((item) => {
      if (item.id === payload.id) {
        item.adult = payload.adult;
        item.child = payload.children;
      }
      return item;
    });
    onChange(tmpRooms);
    setRooms(tmpRooms);
  };

  return (
    <Grid otherStyle={{ padding: 10, border: "gray dotted" }}>
      <Grid>
        <h2>
          住客人數 {guest}人/{room}房
        </h2>
      </Grid>
      <Grid otherStyle={{ padding: 5, background: "lightblue" }}>
        <h3>尚未分配人數: {guest - arranged}人</h3>
      </Grid>
      {rooms.map((item, i) => {
        return (
          <div key={item.id}>
            <Room
              disabled={arranged === guest}
              max={4}
              id={item.id}
              onChange={handleArrangedChange}
            />
            {i !== [...Array(room)].length - 1 && (
              <div
                key={`divider-${i}`}
                style={{
                  height: "1vh",
                  border: "0 none #ccc",
                  borderBottom: "2px solid #ccc",
                }}
              ></div>
            )}
          </div>
        );
      })}
    </Grid>
  );
};

export default RoomAllocation;
