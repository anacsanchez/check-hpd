import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from "react-query";
import { gql, request } from "graphql-request";

const AddressSuggestions = ({ datalistId, addressInput, onChange }) => {
    const getBuildingsByAddress = async () => {
        const { getBuildingsByAddressInput } = await request("/graphql", gql`
            query lookup {
                getBuildingsByAddressInput(address: "${addressInput}") {
                    buildingId
                    address {
                        streetName
                        houseNumber
                        borough
                    }
                }
            }
        `);
        return getBuildingsByAddressInput;
    };

    const { data } = useQuery (
        ["checkAddress", addressInput],
        getBuildingsByAddress,
        {
        onSettled(data) { onChange(data); }
    } );

    if (!data || !data.length) return null;

    return (
        <datalist id={datalistId}>
            {data.map(building => {
                const { buildingId, address: { houseNumber, streetName, borough } } = building;
                return (
                    <option key={buildingId} id={buildingId}>
                        {`${houseNumber} ${streetName}, ${borough}`}
                    </option>
                );
            })}
        </datalist>
    );
};

AddressSuggestions.propTypes = {
    datalistId: PropTypes.string.isRequired,
    addressInput: PropTypes.string,
    onChange: PropTypes.func
};

export default AddressSuggestions;