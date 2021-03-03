import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { AddressSuggestions } from './index';

const AddressSearchForm = ({ handleSubmit }) => {
    const [ addressInput, setAddressInput ] = useState('');
    const [ hasSuggestions, setHasSuggestions ] = useState(false);
    const [ isValidFormat, setIsValidFormat ] = useState(false);

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        handleSubmit(evt.target.address.list.firstChild.id);
    };

    const handleInputChange = ({ target: { value } }) => {
        setAddressInput(value);
        if (!value.length) {
            setIsValidFormat(false);
        }
        setIsValidFormat(!!value.match(/[\w\d-]+\s[\w\d].*/));
    };

    const handleSuggestionsChange = (results) => {
        setHasSuggestions(!!results.length);
    };

    return (
        <form css={formStyles} onSubmit={handleFormSubmit}>
            <div css={inputAreaStyles}>
                <label css={labelStyles}>Enter Address:</label>
                <input css={textInputStyles}
                       type="search"
                       list="address-suggestions-list"
                       name="address"
                       onChange={handleInputChange}
                />
            </div>
            <button css={submitBtnStyles}
                    type="submit"
                    disabled={!hasSuggestions}>
              Submit
            </button>
            { isValidFormat ?
                <AddressSuggestions addressInput={addressInput}
                                    datalistId="address-suggestions-list"
                                    onChange={handleSuggestionsChange}
                /> : null
            }
        </form>
    );
};

AddressSearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
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

export default AddressSearchForm;
