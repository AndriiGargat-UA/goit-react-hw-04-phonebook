import PropTypes from 'prop-types';
import { ContactItem, DeleteButton } from './ContactListItem.styled';

export const ContactListItem = ({ id, name, number, onDelete }) => {
  return (
    <ContactItem>
      <p>{name} :</p>
      <p>{number}</p>
      <DeleteButton type="button" onClick={() => onDelete(id)}>
        Delete
      </DeleteButton>
    </ContactItem>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};