import React, { useState, useEffect } from "react";

const UnMount = () => {
  useEffect(() => {
    console.log("Mount!");

    return () => {
      // useEffect의 return 콜백함수를 설정하면 UnMount 시점에 이 함수를 실행한다
      console.log("UnMount!");
    };
  }, []);

  return <div>Hello!</div>;
};

const LifeCycle2 = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <button
        style={
          isVisible
            ? {
                backgroundColor: "#333",
                color: "#fff",
                padding: 10,
                marginBottom: 30,
                cursor: "pointer",
              }
            : { padding: 10, marginBottom: 30, cursor: "pointer" }
        }
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "ON" : "OFF"}
      </button>
      {isVisible && <UnMount />}
      <hr />
    </div>
  );
};

export default LifeCycle2;
