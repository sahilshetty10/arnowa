import React from "react";

const Messages = ({ messages }: { messages: string[] }) => {
  return (
    <div className="space-y-2">
      {messages.map((msg, index) => (
        <p key={index} className="btn1">
          {msg}
        </p>
      ))}
    </div>
  );
};

export default Messages;
