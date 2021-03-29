import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { request } from 'graphql-request';
import { useQuery } from 'react-query';
import { Query } from '../graphql';
import { BuildingInfo, ItemList, Violation } from './index';

const BuildingResults = ({ buildingId }) => {
	const { status, data } = useQuery(
		['buildingData', buildingId],
		async () => {
			const { getBuildingById } = await request('/graphql', Query.getBuildingById(buildingId));
			return getBuildingById;
		}
	);
	if (status === 'loading') return <div>Loading...</div>;
	if (!data) return null;
	return (
		<div>
			<BuildingInfo building={data} />
			{
				data.violations?.length ? (
					<ItemList>
					{ data.violations.map(violation => <Violation key={violation.violationId} violation={violation} />) }
					</ItemList>
				) : ''
			}
		</div>
	);
};

BuildingResults.propTypes = {
	buildingId: PropTypes.string.isRequired
};

const NoneFound = ({ type }) => (
	<div css={noneFoundStyles}>
		No {type} found
	</div>
);

NoneFound.propTypes = {
	type: PropTypes.string
};

const noneFoundStyles = css({
	fontSize: '16px',
	margin: '12px 2px 16px 2px',
	fontWeight: '600'
});

export default BuildingResults;
