import myObject from "../data.json";
import { useState } from "react";
import { display } from "@mui/system";

const Display = () => {
  const [sign, setSign] = useState("-");
  const [visible, setVisible] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <div
          style={{
            width: "80%",
            height: 100,
            backgroundColor: "#4ecfca",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          {myObject.headerData.map((value, i) => {
            return (
              <div>
                <p
                  style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                  key={i}
                >
                  {value}
                </p>
              </div>
            );
          })}
          <text
            onClick={() => setSign(sign == "-" ? "+" : "-")}
            style={{ cursor: "pointer", fontSize: 50, color: "white" }}
          >
            {sign}
          </text>
        </div>
      </div>

      <div
        style={{
          marginTop: 10,
          display: sign === "-" ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => setVisible(!visible)}
          style={{
            width: "40%",
            height: 300,
            backgroundColor: visible == true ? "#FFFFFF" : "#EEEEEE",
            display: "inline-block",
            cursor: "pointer",
            borderRadius: 20,
          }}
        >
          <p
            style={{
              padding: 20,
              display: visible == true ? "inline-block" : "none",
            }}
          >
            {myObject.contentA}
          </p>
        </div>
        <div
          onClick={() => setVisible(!visible)}
          style={{
            width: "40%",
            height: 300,
            backgroundColor: visible == true ? "#EEEEEE" : "#FFFFFF",
            cursor: "pointer",
            borderRadius: 20,
          }}
        >
          <p
            style={{
              padding: 20,
              display: visible == true ? "none" : "inline-block",
            }}
          >
            {myObject.contentB}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Display;
