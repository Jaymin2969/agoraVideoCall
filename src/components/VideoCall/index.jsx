import React, { useEffect, useState } from "react";
import Controls from "../Controls";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import Videos from "../Videos";

const config = { mode: "rtc", codec: "vp8" };
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const appId = "73977fc3e35e4aa592108e2d99f951a4"; //ENTER APP ID HERE
const token =
  "007eJxTYFgY1xphLfc4Klg0/I10npCC7percjWlRyapuxpMEtLfI6zAYG5saW6elmycamyaapKYaGppZGhgkWqUYmmZZmlqmGhyhSkkpSGQkSHNfQ8jIwMEgvjsDCGpxSWGRsYMDACFSRwE";
const VideoCall = (props) => {
  const { setInCall, channelName } = props;

  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    // function to initialise the SDK
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div>
      <div className="App">
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        )}
        {start && tracks && <Videos users={users} tracks={tracks} />}
      </div>
    </div>
  );
};

export default VideoCall;
