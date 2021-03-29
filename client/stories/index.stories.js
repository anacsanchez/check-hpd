import React from 'react';
import { Home as HomePage } from '../app/components';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default {
    title: 'Home',
    backgrounds: [
        {name: 'black', value: '#00aced'}
    ],
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

export const Home = () => <HomePage />;
