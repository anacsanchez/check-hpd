import React, { useState } from 'react';
import { CheckAddress, BuildingResults } from './index';
import { css } from '@emotion/core';

const Home = () => {
    const [ currBuildingId, setCurrBuildingId ] = useState(null);

    const handleAddressSubmit = (buildingId) => setCurrBuildingId(buildingId);

    return (
        <div id="home" css={homeStyles}>
            <CheckAddress handleSubmit={handleAddressSubmit}/>
            {!currBuildingId ? null :
                <BuildingResults buildingId={currBuildingId}/>
            }
        </div>
    );
};

const homeStyles = css({
    padding: '24px'
});

export default Home;
