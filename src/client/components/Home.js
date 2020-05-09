import React from 'react';
import { CheckAddress } from './index';
import { css } from '@emotion/core';

const Home = () => {
  return (
    <div id="home" css={homeStyles}>
      <CheckAddress />
    </div>
  );
};

const homeStyles = css({
  padding: '24px'
});

export default Home;
