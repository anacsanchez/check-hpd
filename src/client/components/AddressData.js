import React from 'react';
import { css } from '@emotion/core';
import { Table } from './index';
import { violationsTableColsMap, complaintsTableColsMap } from '../constants';

const AddressData = ({ data }) => {
  return (
    <div css={addressDataSectionStyles}>
      {
        data.map(currAddress => {
          const [ addressString, addressData ] = currAddress;
          return (
            <div key={`${addressString}-data`} css={addressTableSectionStyles}>
              <div css={addressStyles}>{addressString}</div>
              {/* <table> */}
              {
                addressData.violations ?
                  <Table
                    title="violations"
                    data={addressData.violations}
                    dataId='violationid'
                    tableColsMap={violationsTableColsMap}
                  />
                : 'No violations found'
              }
              {
                addressData.complaints ?
                  <Table
                    title="complaints"
                    data={addressData.complaints}
                    dataId='problemid'
                    tableColsMap={complaintsTableColsMap}
                  /> : 'No complaints found'
              }
              {/* </table> */}
            </div>
          );
        })
      }
    </div>
  );
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
})

export default AddressData;
