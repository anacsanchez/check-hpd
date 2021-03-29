import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
    BuildingResults as ShowBuildingResults,
    BuildingInfo as AddressBuildingInfo
} from "../app/components";
import { getBuildingByIdData } from './mocks/mockData';

export default {
    title: 'Building'
};

export const BuildingInfo = (args) => <AddressBuildingInfo {...args} />;

BuildingInfo.args = {
    building: getBuildingByIdData
};

export const BuildingResults = (args) => <ShowBuildingResults {...args} />;

BuildingResults.args = {
    buildingId: "974040"
};

BuildingResults.decorators = [
    (Story) => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: Infinity,
                    refetchOnWindowFocus: false,
                    retry: false
                }
            }
        });
        return (
            <QueryClientProvider client={queryClient}>
                <Story/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        );
    }
];
