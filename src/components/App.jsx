import { Component } from 'react';
// import { Formik } from 'formik';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
      return;
    }
    this.setState({
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ], // initial data
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = newContact => {
    const { contacts } = this.state;
    const checkContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (!checkContact) {
      this.setState({ contacts: [...contacts, newContact] });
      return;
    }
    alert(`${newContact.name} is already in contacts.`);
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalize = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalize)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    return (
      <Layout>
        <GlobalStyle />
        <h2>Phonebook</h2>
        <ContactForm
          onSubmit={this.formSubmitHandler}
          myContacts={this.state.contacts}
        />
        <Filter filterName={this.changeFilter} value={this.state.filter} />
        <div>
          <h2>Contacts</h2>
          <ContactList
            contacts={this.visibleContacts()}
            onDelete={this.deleteContact}
          />
        </div>
      </Layout>
    );
  }
}
