import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { request, gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { Table } from './index';
import { violationsTableColsMap, complaintsTableColsMap } from '../constants';

const BuildingResults = ({ buildingId }) => {
	const getBuildingData = async () => {
		const { getBuildingById } = await request('/graphql', gql`
			query {
				getBuildingById(id: ${buildingId}) {
					buildingId
					address {
						houseNumber
						streetName
					}
					violations {
						violationId
					}
				}
			}
		`);
		return getBuildingById;
	};

	const { status, data } = useQuery(
		['buildingData', buildingId],
		getBuildingData
	);

	return (<div></div>);
/*
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
	); */
};

BuildingResults.propTypes = {
	buildingId: PropTypes.number.isRequired
};

const NoneFound = ({ type }) => (
	<div css={noneFoundStyles}>
		No {type} found
	</div>
);

NoneFound.propTypes = {
	type: PropTypes.string
};

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

export default BuildingResults;
