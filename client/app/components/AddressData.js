import React from 'react';
import { css } from '@emotion/core';
import { Table } from './index';
import { violationsTableColsMap, complaintsTableColsMap } from '../constants';

const AddressData = ({ data }) => {
	return (
		<div id="test-id" css={addressDataSectionStyles}>
			{
				data.map(([addressString, addressData]) => {
					return (
						<div key={`${addressString}-data`} css={addressTableSectionStyles}>
							<div css={addressStyles}>{addressString}</div>
							{
								addressData.violations ?
									<Table
										title="violations"
										data={addressData.violations}
										dataId='violationid'
										tableColsMap={violationsTableColsMap}
									/>
									: <NoneFound type='violations' />
							}
							{
								addressData.complaints ?
									<Table
										title="complaints"
										data={addressData.complaints}
										dataId='problemid'
										tableColsMap={complaintsTableColsMap}
									/> : <NoneFound type='complaints' />
							}
						</div>
					);
				})
			}
		</div>
	);
};

const NoneFound = ({ type }) => (
	<div css={noneFoundStyles}>
		No { type} found
	</div>
);

const addressStyles = css({
	fontSize: '16px',
	margin: '18px 6px 4px 6px'
});

const addressDataSectionStyles = css({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
});

const addressTableSectionStyles = css({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
});

const noneFoundStyles = css({
	fontSize: '16px',
	margin: '12px 2px 16px 2px',
	fontWeight: '600'
});

export default AddressData;
