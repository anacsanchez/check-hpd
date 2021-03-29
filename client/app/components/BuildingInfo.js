import React from 'react';
import PropTypes from 'prop-types';

const BuildingInfo = ({ building: { legalStories, numOfApts, address: { houseNumber, streetName, borough, zipCode }, violations, complaints }}) => {
    return (
        <div css={cardStyles}>
            <div css={streetAddressStyles}>
                {houseNumber} {streetName.toLowerCase()}, {borough.toLowerCase()} NY {zipCode}
            </div>
            <div>{legalStories} Floors</div>
            <div>{numOfApts} Apts</div>
            <div css={totalHpdReportsStyles}>
                <div>{violations?.length} Violations</div>
                <div>{complaints?.length} Complaints</div>
            </div>
        </div>
    );
};

BuildingInfo.propTypes = {
    building: PropTypes.shape({
        buildingId: PropTypes.string,
        numOfApts: PropTypes.number,
        legalStories: PropTypes.number,
        address: PropTypes.object,
        violations: PropTypes.array,
        complaints: PropTypes.array
    })
};

const cardStyles = {
    color: 'white',
    marginBottom: '16px'
};

const streetAddressStyles = {
    textTransform: 'capitalize',
    margin: '8px 0px 12px 0px',
    fontSize: '18x'
};

const totalHpdReportsStyles = {
    margin: '16px 0px 0px 0px'
};

export default BuildingInfo;