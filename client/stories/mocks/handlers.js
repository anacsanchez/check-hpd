import { graphql } from 'msw';
import { getBuildingByIdData, getBuildingsByAddressInputData } from "./mockData";

const graphqlApi = graphql.link('/graphql');

export const handlers = [
    graphqlApi.query('GetBuildingsByAddressInput', (req, res, ctx) => {
        const resData = getBuildingsByAddressInputData[req.address] || [];
        return res(
            ctx.data({
                getBuildingsByAddressInput: resData
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

