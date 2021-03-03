import React from 'react';
import PropTypes from 'prop-types';
import { AddressSearchForm } from './index';
import { css } from '@emotion/core';

const CheckAddress = ({ handleSubmit }) => {
	return (
		<div css={checkAddressSectionStyles}>
			<header css={headerStyles}>
				<div>Check HPD Violations and Complaints</div>
			</header>
			<AddressSearchForm handleSubmit={handleSubmit} />
		</div>
	);
};

const headerStyles = css({
	width: '100%',
	display: 'flex',
	justifyContent: 'center'
});

const checkAddressSectionStyles = css({
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column'
});

CheckAddress.propTypes = {
	handleSubmit: PropTypes.func.isRequired
};

export default CheckAddress;
