/* eslint-disable react/prop-types */
import { useState } from "react";
import "./ChatHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEllipsisVertical,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteChat, deleteContact, openChat } from "../../rtk/chatSlice";

const ChatHeader = ({ user }) => {
  const { mainData, chatNum } = useSelector((state) => state.chat);

  const contenData = mainData.find((user) => user.number === chatNum);

  const dispatch = useDispatch();

  const [menu, setMenu] = useState(false);

  const deleteContactHandle = () => {
    dispatch(deleteContact(user));
    dispatch(openChat());
  };

  return (
    <>
      <div className="ChatHeader">
        <div className="ChatHeader__profile">
          <div
            className="ChatHeader__openBtn main-icon"
            onClick={() => dispatch(openChat())}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>

          <div className="ChatHeader__info">
            <h4>{contenData.name}</h4>
          </div>
        </div>

        <div className="ChatHeader__options">
          <div className="main-icon">
            <FontAwesomeIcon icon={faPhone} />
          </div>

          <div className="main-icon" onClick={() => setMenu(!menu)}>
            <FontAwesomeIcon icon={faEllipsisVertical} />

            <div className={menu ? "main-menu open" : "main-menu"}>
              <h5 onClick={() => dispatch(deleteChat(user))}>Delete Chat</h5>

              <h5 onClick={deleteContactHandle}>Delete Contact</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
