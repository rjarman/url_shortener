import { createElement } from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Request, Response } from './server.types';

export const fetchData = (
  req: Request,
  res: Response,
  component: any,
  props?: object | any
) => {
  const _createElement = createElement(component, props);
  const reactStream = renderToNodeStream(_createElement);
  reactStream.pipe(res, { end: false });
  reactStream.on('end', () => {
    res.end();
  });
};
