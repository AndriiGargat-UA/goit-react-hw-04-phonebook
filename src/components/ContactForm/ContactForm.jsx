import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import {
  FormContainer,
  InputContainer,
  AddContactButton,
} from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const newContact = { id: nanoid(), name: name, number: number };
    this.props.onSubmit(newContact);
    this.reset();
  };

  reset = () => {
    const { myContacts } = this.props;
    const checkContact = myContacts.find(
      contact => contact.name.toLowerCase() === this.state.name.toLowerCase()
    );
    if (!checkContact) {
      this.setState({ name: '', number: '' });
    }
    return;
  };

  render() {
    return (
      <FormContainer onSubmit={this.handleSubmit}>
        <InputContainer>
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
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
            value={this.state.number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </InputContainer>

        <AddContactButton type="submit">Add contact</AddContactButton>
      </FormContainer>
    );
  }
}

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
