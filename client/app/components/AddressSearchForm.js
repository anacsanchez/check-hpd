import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { request } from "graphql-request";
import { Query } from "../graphql";
import { useQuery } from "react-query";
import { isValidAddress } from "../utils";
import { AddressSuggestions } from "./index";

const AddressSearchForm = ({ handleSubmit }) => {
    const [ addressInput, setAddressInput ] = useState('');
    const datalistId = "address-suggestions-list";

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        handleSubmit(evt.target.address.list.firstChild.id);
    };

    const { data } = useQuery(["addressSuggestionsList", addressInput], async () => {
            const { getBuildingsByAddressInput } = await request("/graphql", Query.getBuildingsByAddressInput(addressInput));
            return getBuildingsByAddressInput;
        }, {
            enabled: isValidAddress(addressInput)
        }
    );

    return (
        <form css={formStyles} onSubmit={handleFormSubmit}>
            <div css={inputAreaStyles}>
                <label css={labelStyles}>Enter Address:</label>
                <input css={textInputStyles}
                       type="search"
                       list={datalistId}
                       name="address"
                       onChange={({ target: { value } }) => setAddressInput(value)}
                />
                { data?.length ?
                    <AddressSuggestions datalistId={datalistId}
                                        data={data}
                    /> : null
                }
            </div>
            <button css={submitBtnStyles}
                    type="submit"
                    disabled={!data?.length}
            >
              Submit
            </button>
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
