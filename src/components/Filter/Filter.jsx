import PropTypes from 'prop-types';
import { InputContainer } from './Filter.styled';

export const Filter = ({ value, filterName }) => {
  return (
    <InputContainer>
      Find contacts by name
      <input type="text" value={value} onChange={filterName} />
    </InputContainer>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  filterName: PropTypes.func.isRequired,
};
