import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const Pagination = ({ limit, dataLength, handlePageClick }) => {

  const handleClick = (evt) => {
    handlePageClick(evt.target.value);
  };

  let counter = 0;
  const pages = [];

  while (counter * limit < dataLength) {
    pages.push(counter);
    counter++;
  }

  return (
    <div onClick={handleClick} css={ paginationStyles }>
      {
        pages.map((curr, i) =>
          <button key={i} type="button" value={i} css={pageButtonStyles}>
            {i+1}
          </button>
        )
      }
    </div>
  );
};

Pagination.propTypes = {
  limit: PropTypes.number,
  dataLength: PropTypes.number,
  handlePageClick: PropTypes.func.isRequired
};

const paginationStyles = css({
  alignSelf: 'flex-start',
  margin: '4px 12px 12px 12px'
});

const pageButtonStyles = css({
  fontSize: '12px',
  margin: '0px 8px 0px 0px',
  borderRadius: '4px',
  backgroundColor: '#474646',
  color: 'white',
  border: '1px solid gray'
});

export default Pagination;
