import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useChannel, configureAbly } from "@ably-labs/react-hooks";
import { useEffect } from "react";
import axios from "axios";
interface Message {
  data: {
    text: string;
  };
}

configureAbly({
  key: "xmO0bg.v_-3Ig:v4CCUVvtROL_Pxnpo4XD1UqmEtIM5m8PlF1ozE24Uro",
  clientId: Date.now() + "",
});
export const instance = axios.create({
  baseURL: "http://localhost:3000/api/message",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

export default function Home(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [prevMessages, setPrevMessages] = useState(Array);
  const [channel] = useChannel("public-chat", (message) => {
    setMessages((prev) => [...prev, message]);
  });
  useEffect(() => {
    fetch("http://localhost:3000/api/message", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPrevMessages(data.documents);
      });
  }, [messages, prevMessages]);

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        channel.publish(`message`, { text, date: Date.now() });
        setText(``);
        console.log(messages);
        await instance.post("/", {
          name: "Zxin",
          text: text,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <div
        style={{ padding: "10px", display: "flex", flexDirection: "column" }}
      >
        {prevMessages &&
          prevMessages.map((message: any) => (
            <div className="chat chat-start">
              <div className="chat-bubble">{message.text}</div>
            </div>
          ))}
        {messages.map((message) => (
          <div className="chat chat-start">
            <div className="chat-bubble">{message.data.text}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          style={{
            width: "98vw",
            marginBottom: "10px",
            borderColor: "black",
            borderWidth: 1,
            height: "50px",
            borderRadius: "10px",
            padding: "10px",
       
          }}
          placeholder="Type something....."
          className="textarea"
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
      </div>
    </main>
  );
}
