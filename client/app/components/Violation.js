import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils';

const Violation = ({ violation: { violationId, address, violationClass, issuedDate,
    description, currentStatus, statusUpdatedAt, officialViolationStatus } }) => {
    let severityStyles;
    switch (violationClass) {
        case 'A': severityStyles = lowSeverityStyles;
        break;
        case 'B': severityStyles = medSeverityStyles;
        break;
        case 'C': severityStyles = highSeverityStyles;
        break;
    }

    return (
        <div id={violationId}>
            <div css={dataRowStyles}>
                <div css={dataFieldStyles}>
                    <div css={minorLabelStyles}>Issued</div>
                    <div>{formatDate(issuedDate)}</div>
                </div>
                <div css={dataFieldStyles}>
                    <div css={minorLabelStyles}>Updated</div>
                    <div>{formatDate(statusUpdatedAt)}</div>
                </div>
                <div css={dataFieldStyles}>
                    <div css={minorLabelStyles}>Location</div>
                    <div css={dataValueStyles}>
                        Flr {address.story ? address.story : 'N/A'} {address.unit ? `Apt ${address.unit}` : ''}
                    </div>
                </div>
            </div>
            <div css={dataFieldStyles}>
                <div css={minorLabelStyles}>Violation</div>
                <div css={dataValueStyles}>
                    <span css={severityStyles}>Class {violationClass}: </span>
                    <span css={{textTransform: 'lowercase'}}>{description}</span>
                </div>
            </div>
            <div css={dataFieldStyles}>
                <div css={minorLabelStyles}>Status</div>
                <div css={dataValueStyles}>
                    <span>{currentStatus.toLowerCase()}</span>
                    <span css={openStatusStyles}>
                        {officialViolationStatus !== 'Close' ? ` - ${officialViolationStatus}` : ''  }
                    </span>
                </div>
            </div>
        </div>
    );
};

Violation.propTypes = {
    violation: PropTypes.shape({
        violationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        buildingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        address: PropTypes.shape({
            unit: PropTypes.string,
            story: PropTypes.string
        }),
        violationClass: PropTypes.string,
        evaluationDates: PropTypes.shape({
            inspectionDate: PropTypes.string,
            approvedDate: PropTypes.string,
            correctByDate: PropTypes.string,
            certifiedDate: PropTypes.string
        }),
        issuedDate: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string,
        currentStatus: PropTypes.string,
        statusUpdatedAt: PropTypes.string,
        officialViolationStatus: PropTypes.string
    })
};

const minorLabelStyles = {
    color: 'rgb(169 169 169)',
    fontSize: '12px',
    paddingBottom: '4px'
};

const openStatusStyles = {
    color: 'yellow'
};

const lowSeverityStyles = {
    color: 'yellow'
};

const medSeverityStyles = {
    color: 'orange'
};

const highSeverityStyles = {
    color: 'red'
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

export default Violation;