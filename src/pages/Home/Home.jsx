import { useParams } from "react-router-dom";
import "./Home.css";
import { useSelector } from "react-redux";
import Contacts from "../Contacts/Contacts";
import Chat from "../Chat/Chat";

const Home = () => {
  const { mainData } = useSelector((state) => state.chat);

  const param = useParams();

  const userData = mainData.find((user) => user.number === param.number);

  return (
    <section className="Home">
      <Contacts user={userData} />
      <Chat user={userData} />
    </section>
  );
};

export default Home;
