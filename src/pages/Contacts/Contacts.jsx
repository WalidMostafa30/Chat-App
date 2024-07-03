/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Contacts.css";
import ContactsHeader from "../../components/ContactsHeader/ContactsHeader";
import ContactsCard from "../../components/ContactsCard/ContactsCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddNewContact from "../AddNewContact/AddNewContact";

const Contacts = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);

  const modalHandle = () => setOpenModal(!openModal);

  return (
    <section className="Contacts">
      <ContactsHeader user={user} />

      <div className="ContactsCards py-2">
        {user.contacts.length !== 0 ? (
          user.contacts.map((contact) => {
            return <ContactsCard key={contact.number} contact={contact} />;
          })
        ) : (
          <h3 className="m-auto mt-5">Add Contacts</h3>
        )}

        <button
          className="Contacts__add-contact-btn circleBtn"
          onClick={modalHandle}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <AddNewContact
        modalHandle={modalHandle}
        openModal={openModal}
        user={user}
      />
    </section>
  );
};

export default Contacts;
