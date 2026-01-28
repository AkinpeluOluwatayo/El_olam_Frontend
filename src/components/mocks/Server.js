import { setupServer } from 'msw/node';
import { handlers } from './Handlers.js';

export const server = setupServer(...handlers);