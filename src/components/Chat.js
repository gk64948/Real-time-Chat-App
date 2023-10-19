
import React, { useState, useEffect } from "react";
import socket from "../socket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("message", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
