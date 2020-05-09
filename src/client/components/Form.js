import React, { useState } from 'react';

const Form = ({ handleSubmit }) => {

  const [ address, setAddress ] = useState('');

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    handleSubmit(address);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Address:</label>
      <input type="text" name="address" onChange={({target}) => setAddress(target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
