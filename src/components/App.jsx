import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function formSubmitHandler(newContact) {
    const checkContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (!checkContact) {
      setContacts([...contacts, newContact]);
      return;
    }
    alert(`${newContact.name} is already in contacts.`);
  }

  const changeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const visibleContacts = () => {
    const normalize = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalize)
    );
  };

  const deleteContact = id => {
    setContacts(state => state.filter(el => el.id !== id));
  };

  return (
    <Layout>
      <GlobalStyle />
      <h2>Phonebook</h2>
      <ContactForm onSubmit={formSubmitHandler} myContacts={contacts} />
      <Filter filterName={changeFilter} value={filter} />
      <div>
        <h2>Contacts</h2>
        <ContactList contacts={visibleContacts()} onDelete={deleteContact} />
      </div>
    </Layout>
  );
};
