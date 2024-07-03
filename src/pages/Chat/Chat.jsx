/* eslint-disable react/prop-types */
import "./Chat.css";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import { useSelector } from "react-redux";

const Chat = ({ user }) => {
  const { chatNum, chatActive } = useSelector((state) => state.chat);

  const currentChat = user.contacts.find(
    (contact) => contact.number === chatNum
  );

  return (
    <section className={chatActive ? "Chat active" : "Chat"}>
      {chatNum === 0 ? (
        <h4 className="add-chat-msg">Choose Chat To Add Here</h4>
      ) : (
        <>
          <ChatHeader user={user} />

          <div className="Chat__messages">
            {currentChat && currentChat.chat.length !== 0 ? (
              currentChat.chat.map((msg) => (
                <ChatMessage key={msg.id} msg={msg} user={user} />
              ))
            ) : (
              <h4 className="add-chat-msg">No Messages Yet..</h4>
            )}
          </div>

          <ChatInput user={user} />
        </>
      )}
    </section>
  );
};

export default Chat;
