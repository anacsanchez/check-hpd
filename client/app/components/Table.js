import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Pagination from './Pagination';

const Table = ({ title, data, dataId, tableColsMap }) => {

    const [ currentRow, setCurrentRow ] = useState(0);
    const limit = 10;

    return (
        <Fragment>
            <table css={tableStyles}>
                <thead>
                <tr>
                    <th colSpan="100" css={titleStyles}>
                        {title} ({data.length})
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {
                        [...tableColsMap].map(([colDataField, colName]) =>
                            <th css={tableHeaderStyles} key={`${colDataField}-col`}>
                                {colName}
                            </th>
                        )
                    }
                </tr>
                {
                    data.slice(currentRow, currentRow + limit).map(curr =>
                        <tr key={curr[dataId]}>
                            {
                                [...tableColsMap].map(([field]) =>
                                    <td css={tableCellStyles} key={`${curr[dataId]}-${field}`}>
                                        <div css={tableInnerCellStyles}>
                                            {curr[field] ? curr[field] : ''}
                                        </div>
                                    </td>
                                )
                            }
                        </tr>
                    )
                }
                </tbody>
            </table>
            {data.length >= limit ?
                <Pagination
                    limit={limit}
                    dataLength={data.length}
                    handlePageClick={(pageNum) => setCurrentRow(pageNum * limit)}
                />
                : ''}
        </Fragment>
    );
};

Table.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    dataId: PropTypes.string,
    tableColsMap: PropTypes.instanceOf(Map)
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
    padding: '8px'
});

const tableInnerCellStyles = css({
    overflow: 'auto',
    height: '62px',
    maxWidth: '300px'
});

const titleStyles = css({
    fontSize: '16px',
    margin: '12px',
    textTransform: 'capitalize',
    backgroundColor: 'gray',
    padding: '6px 0'
});

export default Table;
