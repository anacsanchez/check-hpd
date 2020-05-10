import React, { useState, Fragment } from 'react';
import { Form, Table } from './index';
import { css } from '@emotion/core';
import { complaintsTableColsMap, violationsTableColsMap, testData } from '../constants';

const CheckAddress = () => {

  const [ addressData, setAddressData ] = useState(JSON.parse(testData));
  const [ isLoading, setIsLoading ] = useState(false);

  const fetchAddressData = (address) => {

    setIsLoading(true);

    fetch(`/api/hpd?address=${encodeURI(address)}`)
    .then(res => res.json())
    .then(data => {
      setIsLoading(false);
      setAddressData(data);
    })
    .catch(err => {
      setIsLoading(false);
      console.log(err)
    });

  };

  return (
    <div css={checkAddressSectionStyles}>
      <header css={headerStyles}>
        <div>Check HPD Violations and Complaints</div>
      </header>
      <Form handleSubmit={fetchAddressData}/>
      { isLoading ? <div css={loadingStyles}>Loading...</div> : '' }
      {
        Object.keys(addressData).length ? (
          <Fragment>
            <Table title="Violations" data={addressData.violations} dataId='id' tableColsMap={violationsTableColsMap} />
            <Table title="Complaints" data={addressData.complaints} dataId='problemId' tableColsMap={complaintsTableColsMap}/>
          </Fragment>
        ) : ''
      }
    </div>
  );
};

const loadingStyles = css({
  margin: '18px'
});

const headerStyles = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
})

const checkAddressSectionStyles = css({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
})

export default CheckAddress;
