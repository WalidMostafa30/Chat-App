/* eslint-disable react/prop-types */
import { useState } from "react";
import "./ChatMessage.css";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteMsg } from "../../rtk/chatSlice";

const ChatMessage = ({ msg, user }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);

  return (
    <div
      className="ChatMessage"
      style={{ justifyContent: msg.sender === "user" && "flex-end" }}
    >
      <div
        className="ChatMessage__container"
        style={{
          backgroundColor: msg.sender === "user" && "var(--main-color)",
        }}
        onClick={() => setMenu(!menu)}
      >
        <h5
          style={{
            color: msg.sender === "user" && "white",
          }}
          className="ChatMessage__message"
        >
          {msg.content}
        </h5>

        <div className={menu ? "ChatMessage_menu open" : "ChatMessage_menu"}>
          <span onClick={() => dispatch(deleteMsg({ user, msg }))}>
            <FontAwesomeIcon icon={faTrashCan} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
