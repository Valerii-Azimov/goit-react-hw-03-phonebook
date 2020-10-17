import React, { Component } from 'react';
import Layout from './Layout/Layout';
import Section from './Section/Section';
import AddContactsForm from './AddContactsForm/AddContactsForm';
import ContactsList from './ContactsList/ContactsList';
import { v4 as uuidv4 } from 'uuid';
import ContactFinder from './ContactFinder/ContactFinder';

export default class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');

    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    const duplicateName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (duplicateName) {
      alert(`${name} is already in contacts.`);

      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  findContact = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleTask = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  RemoveContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId,
        ),
      };
    });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleTask();
    // const onRemove = this.onRemove();
    return (
      <Layout>
        <Section title="Phonebook">
          <AddContactsForm onAddContact={this.addContact}></AddContactsForm>
        </Section>
        <Section title="Contacts">
          <ContactFinder
            contacts={visibleContacts}
            value={filter}
            onChangeFilter={this.findContact}
          ></ContactFinder>
          <ContactsList
            contacts={visibleContacts}
            onRemove={this.RemoveContact}
          ></ContactsList>
        </Section>
      </Layout>
    );
  }
}
