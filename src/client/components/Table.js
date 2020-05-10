import React from 'react';
import { css } from '@emotion/core';

const Table = ({ title, data, dataId, tableColsMap }) => {

  return (
    <table css={tableStyles}>
      <thead>
        <th colSpan="100" css={titleStyles}>
          {title}
        </th>
      </thead>
      <tr>
      { [...tableColsMap].map(col => {
          const [ colDataField, colName ] = col;
          return (
            <th css={tableHeaderStyles} key={`${colDataField}-col`}>
              {colName}
            </th>
          );
        })
      }
      </tr>
      {
        data.map(curr =>
          <tr key={curr[dataId]}>
          {
            [...tableColsMap].map(col => {
              const field = col[0];
              return (
                <td css={tableCellStyles} key={`${curr[dataId]}-${field}`}>
                  <div css={tableInnerCellStyles}>
                    {curr[field] ? curr[field] : ''}
                  </div>
                </td>
              );
            })
          }
          </tr>
        )
      }
    </table>
  );
};


const tableHeaderStyles = css({
  fontSize: '14px',
  border: '1px solid gray',
  backgroundColor: '#3f003f',
  whiteSpace: 'nowrap',
  padding: '10px'
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
});

const tableInnerCellStyles = css({
  overflow: 'auto',
  height: '62px',
});

const titleStyles = css({
  fontSize: '16px',
  margin: '12px',
  textTransform:'capitalize',
  backgroundColor: 'gray'
});

export default Table;
