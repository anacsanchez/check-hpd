import React from "react";
import {
    Complaint as SingleComplaint
} from "../app/components";
import { getBuildingByIdData } from './mocks/mockData';

export default {
    title: 'Complaint'
};

const ComplaintTemplate = (args) => <SingleComplaint {...args} />;

export const Complaint = ComplaintTemplate.bind({});
Complaint.args = {
    complaint: getBuildingByIdData.complaints[0]
};