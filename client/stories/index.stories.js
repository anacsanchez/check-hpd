import React from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import '../public/style.css';
import { CheckAddress, Form, Home, Table, AddressData } from '../src/client/components';
import { mockAddressData } from './mockData';
import { violationsTableColsMap, complaintsTableColsMap } from '../src/client/constants';

export default {
  title: 'Check HPD App',
  decorators: [
    withKnobs,
    withA11y
  ],
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

export const AddressDataSection = () => (
  <AddressData
    data = { mockAddressData }
  />
)
