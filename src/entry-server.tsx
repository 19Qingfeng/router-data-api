import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider
} from 'react-router-dom/server';
import { Request, Response } from 'express';
import createFetchRequest from '../server/createFetchRequest';
import routers from '../src/config/routes';
import './styles/App.css';
import './styles/index.css';

const handler = createStaticHandler(routers);

export async function render(req: Request, res: Response) {
  const fetchRequest = createFetchRequest(req, res);

  const context = await handler.query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(handler.dataRoutes, context);

  return renderToString(
    <StaticRouterProvider router={router} context={context} />
  );
}
