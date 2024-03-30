// Main routes definition, creates a router and adds all the other routes to it

import express from 'express';
import pictures from './api/pictures';

const routes = express.Router();

routes.use('/pictures', pictures);

export default routes;
