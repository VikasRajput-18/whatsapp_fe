import React, { useState } from "react";
import Ringing from "./Ringing";
import Header from "./Header";
import CallArea from "./CallArea";
import CallActions from "./CallActions";
import ringtone from "../../../images/files/ringing.mp3";
const Call = ({
  call,
  setCall,
  myVideo,
  userVideo,
  stream,
  callAccepted,
  answerCall,
  show,
  endCall,
  totalSecInCall,
  setTotalSecInCall,
}) => {
  const { receiveingCall, callEnded, name } = call;
  const [showActions, setShowActions] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg
         ${receiveingCall && !callAccepted ? "hidden" : ""}
        `}
        // ${!myVideo?.current?.srcObject?.active ? "hidden" : ""}
        onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}
      >
        {/* container  */}
        <div className="">
          <div className="">
            <Header />
            {/* call area  */}
            <CallArea name={name} callAccepted={callAccepted} totalSecInCall={totalSecInCall} setTotalSecInCall={setTotalSecInCall} />
            {/* call actions  */}
            {showActions ? <CallActions endCall={endCall} /> : null}
          </div>
          {/* video streams  */}
          <div>
            {/* user video  */}
            {/* <div></div> */}
            {/* my video  */}
            {callAccepted && !callEnded ? (
              <div>
                <video
                  ref={userVideo}
                  playsInline
                  muted
                  autoPlay
                  onClick={() => setToggle((prev) => !prev)}
                  className={toggle ? "SmallVideoCall" : "largeVideoCall"}
                  // className={"largeVideoCall"}
                ></video>
              </div>
            ) : null}
            {/* myvideo  */}
            {stream && (
              <div>
                <video
                  ref={myVideo}
                  playsInline
                  muted
                  autoPlay
                  onClick={() => setToggle((prev) => !prev)}
                  className={`${toggle ? "largeVideoCall" : "SmallVideCall"}  ${
                    showActions ? "moveVideoCall" : ""
                  }`}
                  // className={`SmallVideoCall  ${
                  //   showActions ? "moveVideoCall" : ""
                  // }`}
                ></video>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ringing  */}
      {receiveingCall && !callAccepted ? (
        <Ringing
          call={call}
          setCall={setCall}
          answerCall={answerCall}
          endCall={endCall}
        />
      ) : null}

      {/* calling ringing  */}
      {!callAccepted && show ? (
        <audio src={ringtone} autoPlay loop></audio>
      ) : null}
    </>
  );
};

export default Call;
