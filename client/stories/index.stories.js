import React from 'react';
import { CheckAddress, Form, Home, Table, AddressData } from '../app/components';
import { mockAddressData } from './mockData';
// import { violationsTableColsMap, complaintsTableColsMap } from '../app/constants';

export default {
  title: 'Check HPD App',
  backgrounds: [
    { name: 'black', value: '#00aced' }
  ]
};

export const CheckAddressSection = () => <CheckAddress />;

export const AddressForm = () => <Form />;

export const HomePage = () => <Home />;

// export const ViolationsDataTable = () => (
//   <Table
//     title={text('Table Title', 'Violations')}
//     data={ violationsMockData }
//     dataId='id'
//     tableColsMap={ violationsTableColsMap }
//   />
// );

export const AddressDataSection = (args) => <AddressData {...args} />

AddressDataSection.args = {
	data: mockAddressData
}
