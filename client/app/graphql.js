import { gql } from 'graphql-request';

export const Query = {
    getBuildingById: (buildingId) => gql`
        query {
            getBuildingById(id: ${buildingId}) {
                buildingId
                address {
                    houseNumber
                    streetName
                }
                violations {
                    violationId
                }
                complaints {
                    complaintId
                }
            }
        }
    `,
    getBuildingsByAddressInput: (addressInput) => gql`
        query {
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