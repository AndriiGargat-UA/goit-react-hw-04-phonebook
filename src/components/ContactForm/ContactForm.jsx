import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import {
  FormContainer,
  InputContainer,
  AddContactButton,
} from './ContactForm.styled';

export const ContactForm = ({ onSubmit, myContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    const checkContact = myContacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (!checkContact) {
      setName('');
      setNumber('');
    }
    return;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = { id: nanoid(), name: name, number: number };
    onSubmit(newContact);
    reset();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </InputContainer>

      <InputContainer>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </InputContainer>

      <AddContactButton type="submit">Add contact</AddContactButton>
    </FormContainer>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  myContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
