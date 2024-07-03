/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import "./ContactsCard.css";
import { openChat, selectChat } from "../../rtk/chatSlice";

const ContactsCard = ({ contact }) => {
  const dispatch = useDispatch();
  const contactCardHandle = () => {
    dispatch(selectChat(contact.number));
    dispatch(openChat());
  };
  return (
    <div className="ContactsCard" onClick={contactCardHandle}>
      <div className="ContactsCard__info">
        <h4>{contact.name}</h4>

        <p>
          {contact.chat.length > 0
            ? contact.chat[contact.chat.length - 1].content
            : contact.number}
        </p>
      </div>
    </div>
  );
};

export default ContactsCard;
