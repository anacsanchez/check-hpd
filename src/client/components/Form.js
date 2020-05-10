import React, { useState } from 'react';
import { css } from '@emotion/core';

const Form = ({ handleSubmit }) => {

  const [ address, setAddress ] = useState('');

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    handleSubmit(address);
  };

  return (
    <form css={formStyles} onSubmit={handleFormSubmit}>
      <div css={inputAreaStyles}>
        <label css={labelStyles}>Enter Address:</label>
        <input css={textInputStyles} type="text" name="address" onChange={({target}) => setAddress(target.value)} />
      </div>
      <button css={submitBtnStyles} type="submit">Submit</button>
    </form>
  );
};

const formStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '8px'
});

const inputAreaStyles = css({
  margin: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const labelStyles = css({
  fontSize: '16px',
  margin: '8px'
});

const textInputStyles = css({
  fontSize: '14px',
  padding: '4px',
  minWidth: '200px'
});

const submitBtnStyles = css({
  border: '1px solid green',
  backgroundColor: 'green',
  fontSize: '14px',
  borderRadius: '4px',
  color: 'white',
  margin: '8px'
});

export default Form;
