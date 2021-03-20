import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const initializeWorker = () => setupWorker(...handlers);