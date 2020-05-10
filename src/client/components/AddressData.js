import React from 'react';
import { css } from '@emotion/core';
import { violationsTableColsMap, complaintsTableColsMap } from '../constants';
import { Table } from './index';

const AddressData = ({ data }) => {
  return (
    <div>
      {
        data.map(currAddress => {
          const [ addressString, addressData ] = currAddress;
          return (
            <div key={`${addressString}-data`}>
              <div>{addressString}</div>
              <table>
              {
                addressData.violations ?
                  <Table
                    title="violations"
                    data={addressData.violations}
                    dataId='violationid'
                    tableColsMap={violationsTableColsMap}
                  />
                : null
              }
              {
                addressData.complaints ?
                  <Table
                    title="complaints"
                    data={addressData.complaints}
                    dataId='problemid'
                    tableColsMap={complaintsTableColsMap}
                  /> : null
              }
              </table>
            </div>
          );
        })
      }
    </div>
  );
};

export default AddressData;
