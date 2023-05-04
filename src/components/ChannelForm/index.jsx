import React, { useEffect, useState } from "react";

const ChannelForm = (props) => {
  const { setInCall, setChannelName } = props;
  const appId = "73977fc3e35e4aa592108e2d99f951a4"; //ENTER APP ID HERE

  return (
    <form className="join">
      {appId === "" && (
        <p style={{ color: "red" }}>
          Please enter your Agora App ID in App.tsx and refresh the page
        </p>
      )}
      <input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}
      >
        Join
      </button>
    </form>
  );
};

export default ChannelForm;
