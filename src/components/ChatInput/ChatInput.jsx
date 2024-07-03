/* eslint-disable react/prop-types */
import { useRef } from "react";
import "./ChatInput.css";
import { useDispatch } from "react-redux";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addMsg } from "../../rtk/chatSlice";

const ChatInput = ({ user }) => {
  const dispatch = useDispatch();

  const msgRef = useRef();

  const addNewMsg = (e) => {
    e.preventDefault();
    const msg = msgRef.current.value.trim();

    if (msg.length !== 0) {
      dispatch(addMsg({ msg: msg, user }));
      msgRef.current.value = null;
    }
  };

  return (
    <form className="ChatInput" onSubmit={addNewMsg}>
      <div className="ChatInput__input">
        <input placeholder="Message.." ref={msgRef} />
      </div>

      <button className="circleBtn">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
};

export default ChatInput;
