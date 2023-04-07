
import "./videocall.css"
import React, { useEffect, useState, useRef, useMemo } from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import {useSocket} from "./Socket"

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

function VideoCall() {
  const [yourID, setYourID] = useState(""); 
  const [users, setUsers] = useState([]);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"))

  const userVideo = useRef();
  const partnerVideo = useRef();
  const { socket } = useSocket();

  useEffect(() => {
    if (!user.executive || user.executive == "0")
            socket.emit("addUserForVideoCall", user._id);
        else 
            socket.emit("addExecutiveForVideoCall", user._id);
  }, [])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      userVideo.current.srcObject = stream
    })
  }, [])

  useEffect(() => {

    socket.on("yourID", (id) => {
      setYourID(id);
    })

      socket.on("getExecutivesForVideoCall", (users) => {
        setUsers(users);
        console.log(users)
      })

    socket.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })

    socket.emit("getFreeExecutives")
  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {

        iceServers: [
            {
                urls: "stun:numb.viagenie.ca",
                username: "sultan1640@gmail.com",
                credential: "98376683"
            },
            {
                urls: "turn:numb.viagenie.ca",
                username: "sultan1640@gmail.com",
                credential: "98376683"
            }
        ]
    },
      stream: stream,
    });

    peer.on("signal", data => {
      socket.emit("callUser", { userToCall: id, signalData: data, from: yourID })
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })

  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      // <Video playsInline muted ref={userVideo} autoPlay />
      <video ref={userVideo} muted autoPlay playsInline></video>
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video ref={partnerVideo} autoPlay playsInline></video>
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }
  return (
    <Container>
      <Row>
        <video ref={userVideo} muted autoPlay playsInline></video>
        {PartnerVideo}
      </Row>
      <Row>
        {users && Array.isArray(users) && users.map(user => {
          return (
            <button key={user.socketId} onClick={() => callPeer(user.socketId)}>Call {user.socketId}</button>
          );
        })}
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
  );
}


export default VideoCall;
