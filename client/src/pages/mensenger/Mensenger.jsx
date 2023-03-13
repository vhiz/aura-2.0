import Error from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { makeRequest } from "../../axios";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/messeges/Message";
import Navbar from "../../components/navbar/Navbar";
import Online from "../../components/online/Online";
import { AuthContext } from "../../context/authContext";
import "./mensenger.scss";
import { io } from "socket.io-client";
export default function Mensenger() {
  const { currentUser } = useContext(AuthContext);
  const [currChat, setCurrentChat] = useState(null);
  const [newmessage, setNewMessage] = useState("");
  const [arrivalMessage, setArravial] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState({});
  const socket = useRef();

  const { error, data, isLoading } = useQuery(
    ["conversation", currentUser],
    async () => {
      const res = await makeRequest.get(`/conversations/${currentUser._id}`);

      return res.data;
    }
  );

  const { error: errorMessage, isLoading: loadingM } = useQuery(
    ["messages", currChat],
    async () => {
      const res = await makeRequest.get(`/message/${currChat?._id}`);
      setMessages(res.data);
      return res.data;
    }
  );

  const scrollRef = useRef();

  //websocket

  useEffect(() => {
    socket.current = io("https://auraapi.onrender.com");

    socket.current.on("getMessage", (data) => {
      setArravial({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currChat, messages]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [currentUser]);

  const queryClient = new useQueryClient();

  const mutation = useMutation(
    (newMessage) => {
      return makeRequest.post(`/message/${currentUser._id}`, newMessage);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["messages"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    const newMessage = [
      {
        conversationId: currChat._id,
        text: newmessage,
      },
    ];

    const friendId = currChat.members.find((m) => m !== currentUser._id);
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: friendId,
      text: newMessage,
    });
    mutation.mutate(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="mensenger">
        <div className="chatMenu">
          <div className="wrapper">
            <input type="text" placeholder="Search for friends" />
            {error ? (
              <Error />
            ) : isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {data.map((c) => (
                  <div onClick={() => setCurrentChat(c)} key={c._id}>
                    <Conversations conversation={c} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="wrapper">
            {currChat ? (
              <>
                <div className="wrapperTop">
                  {errorMessage ? (
                    <Error />
                  ) : loadingM ? (
                    <CircularProgress />
                  ) : (
                    <>
                      {messages.map((m) => (
                        <div ref={scrollRef} key={m._id}>
                          <Message
                            message={m}
                            own={m.sender === currentUser._id}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <div className="wrapperBottom">
                  <textarea
                    placeholder="Write message"
                    value={newmessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button onClick={handleClick}>Send</button>
                </div>
              </>
            ) : (
              <span>Open a conversation to start a chat</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="wrapper">
            <Online onlineUsers={onlineUsers} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  );
}
