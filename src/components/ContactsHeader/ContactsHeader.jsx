/* eslint-disable react/prop-types */
import {  useState } from "react";
import "./ContactsHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../rtk/chatSlice";
import { useNavigate } from "react-router-dom";

const ContactsHeader = ({ user }) => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteUserHandle = () => {
    dispatch(deleteUser(user));
    navigate(`/`);
  };

  return (
    <div className="ContactsHeader">
      <h1 className="ContactsHeader__userName">{user.name.toUpperCase()}</h1>

      <div className="main-icon" onClick={() => setMenu(!menu)}>
        <FontAwesomeIcon icon={faBars} />

        <div className={menu ? "main-menu open" : "main-menu"}>

          <h5 onClick={deleteUserHandle}>Delete Acount</h5>
        </div>
      </div>
    </div>
  );
};

export default ContactsHeader;
