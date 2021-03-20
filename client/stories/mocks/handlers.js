import { graphql } from 'msw';
import { getBuildingByIdData } from "./mockData";

const graphqlApi = graphql.link('/graphql');

export const handlers = [
    graphqlApi.query('GetBuildingsByAddressInput', (req, res, ctx) => {
        return res(
            ctx.data({
                getBuildingsByAddressInput: [{
                    buildingId: 3412,
                    address: {
                        houseNumber: 395,
                        streetName: 'South End Ave'
                    }
                }]
            })
        );
    }),
    graphqlApi.query('GetBuildingById', (req, res, ctx) => {
        return res(
            ctx.data({
                getBuildingById: getBuildingByIdData
            })
        );
    })
];

