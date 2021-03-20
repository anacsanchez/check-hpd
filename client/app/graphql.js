import { gql } from 'graphql-request';

export const Query = {
    getBuildingById: (buildingId) => gql`
        query GetBuildingById {
            getBuildingById(id: ${buildingId}) {
                buildingId
                legalStories
                numOfApts
                recordStatus
                address {
                    houseNumber
                    streetName
                    zipCode
                    borough
                }
                violations {
                    violationId,
                    address {
                        story
                        unit
                        neighborhood
                    },
                    issuedDate
                    description
                    type
                    violationClass
                    currentStatus
                    statusUpdatedAt
                    officialViolationStatus
                    evaluationDates {
                        inspectionDate
                        approvedDate
                        correctByDate
                    }
                }
                complaints {
                    complaintId
                    receivedDate
                    address {
                        unit
                    }
                    status
                    statusUpdatedAt
                    problems {
                        problemId
                        location
                        unitType
                        severity
                        category
                        subCategory
                        problemType
                        status
                        statusUpdatedAt
                        statusDescription
                    }
                }
            }
        }
    `,
    getBuildingsByAddressInput: (addressInput) => gql`
        query GetBuildingsByAddressInput {
            getBuildingsByAddressInput(address: "${addressInput}") {
                buildingId
                address {
                    streetName
                    houseNumber
                    borough
                }
            }
        }
    `
};