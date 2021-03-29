import React from 'react';
import {
    AddressSearchForm as SearchAddressForm
} from '../app/components';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default {
    title: 'Address Search',
    decorators: [
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
    ]
};

export const AddressSearchForm = (args) => <SearchAddressForm {...args} />;

AddressSearchForm.args = {
    handleSubmit: () => null
};

