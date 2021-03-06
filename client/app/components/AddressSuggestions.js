import React from 'react';
import PropTypes from 'prop-types';

const AddressSuggestions = ({ datalistId, data }) => {
    if (!data?.length) return null;

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
    data: PropTypes.array
};

export default AddressSuggestions;
