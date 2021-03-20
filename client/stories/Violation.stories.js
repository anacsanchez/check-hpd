import React from "react";
import {
    Violation as SingleViolation
} from "../app/components";
import { getBuildingByIdData } from './mocks/mockData';

export default {
    title: 'Violation'
};

const ViolationTemplate = (args) => <SingleViolation {...args} />;

export const ClassA = ViolationTemplate.bind({});
ClassA.args = {
    violation: getBuildingByIdData.violations[0]
};

export const ClassB = ViolationTemplate.bind({});
ClassB.args = {
    violation: getBuildingByIdData.violations[2]
};

export const ClassC = ViolationTemplate.bind({});
ClassC.args = {
    violation: getBuildingByIdData.violations[9]
};
