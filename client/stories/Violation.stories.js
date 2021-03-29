import React from "react";
import {
    ItemList as ItemListWrapper,
    Violation as SingleViolation
} from "../app/components";
import { getBuildingByIdData } from './mocks/mockData';

export default {
    title: 'Violation'
};

const ViolationTemplate = (args) => <SingleViolation {...args} />;

export const ClassAViolation = ViolationTemplate.bind({});
ClassAViolation.args = {
    violation: getBuildingByIdData.violations[0]
};

export const ClassBViolation = ViolationTemplate.bind({});
ClassBViolation.args = {
    violation: getBuildingByIdData.violations[2]
};

export const ClassCViolation = ViolationTemplate.bind({});
ClassCViolation.args = {
    violation: getBuildingByIdData.violations[9]
};

export const ViolationsList = (args) => (
    <ItemListWrapper>
        {
            getBuildingByIdData.violations.map(violation => (
                <SingleViolation key={violation.violationId}
                                 violation={violation}
                                 {...args}
                />)
            )
        }
    </ItemListWrapper>
);
