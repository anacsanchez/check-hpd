import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils';

const Complaint = ({ complaint: { complaintId, address, receivedDate, status,
    statusUpdatedAt, problems } }) => {
    return (
        <div>Received Date</div>
    );
};

Complaint.propTypes = {
    complaint: PropTypes.shape({
        complaintId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        address: PropTypes.shape({
            unit: PropTypes.string
        }),
        receivedDate: PropTypes.string,
        status: PropTypes.string,
        statusUpdatedAt: PropTypes.string,
        problems: PropTypes.arrayOf(PropTypes.shape({
            problemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            location: PropTypes.string,
            unitType: PropTypes.string,
            severity: PropTypes.string,
            category: PropTypes.string,
            subCategory: PropTypes.string,
            problemType: PropTypes.string,
            status: PropTypes.string,
            statusUpdatedAt: PropTypes.string,
            statusDescription: PropTypes.string
        }))
    })
};

const minorLabelStyles = {
    color: 'rgb(183 201 246)',
    fontSize: '12px',
    paddingBottom: '6px'
};

const openStatusStyles = {
    color: 'yellow'
};

const dataFieldStyles = {
    paddingBottom: '14px'
};

const dataValueStyles = {
    textTransform: 'capitalize'
};

const dataRowStyles = {
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between'
};

export default Complaint;