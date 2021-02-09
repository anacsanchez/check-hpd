import React, { useState } from 'react';
import { Form, AddressData } from './index';
import { css } from '@emotion/core';

const CheckAddress = () => {

	const [addressData, setAddressData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchAddressData = (address) => {
		setIsLoading(true);
		fetch(`/api/hpd?address=${encodeURI(address)}`)
			.then(res => res.json())
			.then(data => {
				setIsLoading(false);
				setAddressData(data);
			})
			.catch(err => {
				console.error(err);
				setIsLoading(false);
			});

	};

	return (
		<div css={checkAddressSectionStyles}>
			<header css={headerStyles}>
				<div>Check HPD Violations and Complaints</div>
			</header>
			<Form handleSubmit={fetchAddressData} />
			{ isLoading ? <div css={loadingStyles}>Loading...</div> : ''}
			{ addressData.length ? <AddressData data={addressData} /> : ''}
		</div>
	);
};

const loadingStyles = css({
	margin: '18px'
});

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

export default CheckAddress;
