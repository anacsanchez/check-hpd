import React, { Fragment } from 'react';
import { css } from '@emotion/core';

const Table = ({ title, data, dataId, tableColsMap }) => {
  return (
    <Fragment>
      <div css={titleStyles}>{title}</div>
      { data.length ?
      <table css={tableStyles}>
        <thead>
          <tr>
            { [...tableColsMap].map((col) => <th css={tableHeaderStyles} key={`${col[0]}-col`}>{col[1]}</th>)}
          </tr>
        </thead>
        <tbody>
        {
          data.map(curr => {
            return (
              <tr key={curr[dataId]}>
              {
                [...tableColsMap].map(col => {
                  const field = col[0];
                  return (
                    <td css={tableCellStyles} key={`${curr[dataId]}-${field}`}><div css={tableInnerCellStyles}>{curr[field] ? curr[field] : ''}</div></td>
                  );
                  }
                )
              }
              </tr>
            );
          })
        }
        </tbody>
      </table>
    : `No ${title} found.`}
    </Fragment>
  );
};


const tableHeaderStyles = css({
  fontSize: '14px',
  border: '1px solid gray',
  backgroundColor: '#3f003f'
});

const tableStyles = css({
  border: '1px solid gray',
  borderCollapse: 'collapse',
  margin: '12px'
});
const tableCellStyles = css({
  fontSize: '14px',
  border: '1px solid gray',
  padding: '6px'
})

const tableInnerCellStyles = css({
  overflow: 'auto',
  height: '62px',
})

const titleStyles = css({
  fontSize: '16px',
  margin: '12px'
})

export default Table;
