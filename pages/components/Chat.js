import axios from "axios";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [chat, setChat] = useState([]);
  const [show, setShow] = useState(false);

  const sendMessage = async () => {
    try {
      const { data } = await axios.post("/api/chat", {
        room,
        username,
        currentMessage,
      });
      if (currentMessage !== "") {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    const fectData = async () => {
      const { data } = await axios.post("/api/chatRoom", { room });
      setChat(data);
    };
    fectData();
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {chat.map((item, i) => {
            const time = new Date(item.createdAt).toLocaleTimeString();
            const date = new Date(item.createdAt).toLocaleDateString();
            return (
              <div key={i}>
                <div
                  className="message"
                  id={username === item.userName ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{item.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time" className="text-black">
                        {time}
                      </p>
                      <p id="author" className="text-black">
                        {item.userName}
                      </p>
                    </div>
                  </div>
                </div>
                ;
              </div>
            );
          })}
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time" className="text-black">
                      {messageContent.time}
                    </p>
                    <p id="author" className="text-black">
                      {messageContent.author}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
          className="text-black"
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
