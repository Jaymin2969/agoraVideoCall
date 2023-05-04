import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

import "./App.css";
import VideoCall from "./components/VideoCall";
import ChannelForm from "./components/ChannelForm";
// import VideoCall from "./components/VideoCall";
// import ChannelForm from "./components/ChannelForm";

const appId = "73977fc3e35e4aa592108e2d99f951a4"; //ENTER APP ID HERE
const token =
  "007eJxTYFgY1xphLfc4Klg0/I10npCC7percjWlRyapuxpMEtLfI6zAYG5saW6elmycamyaapKYaGppZGhgkWqUYmmZZmlqmGhyhSkkpSGQkSHNfQ8jIwMEgvjsDCGpxSWGRsYMDACFSRwE";

const config = { mode: "rtc", codec: "vp8" };
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

function App() {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  return (
    <div>
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  );
}

export default App;
