import React, { Fragment } from 'react';
import { css } from '@emotion/core';

const Table = ({ title, data, dataId, tableColsMap }) => {
  return (
    <Fragment>
      <div>{title}</div>
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
                  if(curr[field]) {
                    const fieldData = field.match('date') ? curr[field].slice(0,10) : curr[field];
                    return (<td css={tableCellStyles} key={`${curr[dataId]}-${field}`}>{fieldData}</td>);
                  }
                  else {
                    return <td css={tableCellStyles} key={`${curr[dataId]}-${field}`}>''</td>;
                  }
                })
              }
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </Fragment>
  );
};


const tableHeaderStyles = css({
  fontSize: '14px'
});

const tableStyles = css({
  border: '1px solid gray'
});
const tableCellStyles = css({
  fontSize: '14px',
  border: '1px solid gray'
})

export default Table;
