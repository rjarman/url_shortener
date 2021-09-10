import { _404 } from '../../pages/404/404.view';
import { Color, FetchData } from '../server.types';
import { Request, Response, NextFunction } from '../server.types';

export const WatcherMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url: string = req.protocol + '://' + req.get('host') + req.originalUrl;
  const permittedExt = ['css', 'js', 'ico', 'svg'];
  const permittedURL = ['/', '/url_shortener'];

  console.log(url.split('.').slice(-1)[0], permittedExt);
  if (
    permittedExt.indexOf(url.split('.').slice(-1)[0]) >= 0 ||
    permittedURL.indexOf(req.originalUrl) >= 0
  )
    next();
  else FetchData(req, res, _404);
};
