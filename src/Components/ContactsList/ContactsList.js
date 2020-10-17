import React from 'react';
import './ContactsList.css';

function ContactsList({ contacts, onRemove }) {
  return (
    <ul className="ContactsList">
      {contacts.map(({ id, name, number }) => (
        <li key={id} className="ContactsList--item">
          <div>
            {name}: {number}
          </div>
          <button
            type="button"
            onClick={() => onRemove(id)}
            className="ContactsListItem-button"
          >
            Delete
          </button>
        </li>

        // <ContactsListItem

        //   name={name}
        //   number={number}
        //   onRemove={() => onRemoveTask(id)}
        // />
      ))}
    </ul>
  );
}

export default ContactsList;
