import React from "react";
import { addDecorator } from '@storybook/react';
import { initializeWorker, mswDecorator } from 'msw-storybook-addon';
import { withConsole } from '@storybook/addon-console';
import { QueryClient, QueryClientProvider } from 'react-query';
// import '@storybook/addon-console';
import '../public/style.css';
import { setupWorker } from 'msw';

import {ReactQueryDevtools} from "react-query/devtools";

// initializeWorker();
// addDecorator(mswDecorator);

// if (typeof global.process === 'undefined') {
//     worker = (0, _msw.setupWorker)();
//     worker.start(options);
// }


// export const decorators = [
//     // mswDecorator,
//     // (Story) => {
//     //     const queryClient = new QueryClient({
//     //         defaultOptions: {
//     //             queries: {
//     //                 staleTime: Infinity,
//     //                 refetchOnWindowFocus: false,
//     //                 retry: false
//     //             }
//     //         }
//     //     })
//     //     return (
//     //         <QueryClientProvider client={queryClient}>
//     //             <Story />
//     //             <ReactQueryDevtools initialIsOpen={false} />
//     //         </QueryClientProvider>
//     //     )
//     // }
// ]

// initializeWorker();
// addDecorator(mswDecorator);

// addDecorator((storyFn, context) => withConsole()(storyFn)(context));
//
import { worker } from '../stories/mocks/browser';
worker.start()
    .catch(err => console.error(err))

