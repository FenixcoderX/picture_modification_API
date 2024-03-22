import express from 'express';
import pictures from './api/pictures';

const routes = express.Router();

// routes.get('/', (req, res) => {
//     res.send('main api route');
// });

routes.use('/pictures', pictures);

export default routes;
