import {
  Response,
  Request,
  RequestHandler,
  ViewInt,
  Application,
  Database,
  Router,
} from './server.types';
import { nanoid } from 'nanoid';
import { link } from './config.server.json';

export class URLShortenerAPI implements ViewInt {
  private hostLink: string;
  constructor(private application: Application, private database: Database) {
    this.hostLink =
      process.env.NODE_ENV === 'production'
        ? link.production
        : link.development;
  }

  private makeRoute(shortURL: string, longURL: string) {
    let redirectLink: Router = Router();
    redirectLink.all(`/${shortURL}`, (req: Request, res: Response) => {
      res.redirect(longURL);
    });
    this.application.use('/', redirectLink);
  }

  private genShortURL(data: {
    longURL: string;
    id: string | null;
  }): {
    shortURL: string;
    id: number;
  } {
    const id = data.id ? Number(data.id) : new Date().getTime();
    const urlCode = nanoid(10);
    let shortURLData: {
      shortURL: string;
      id: number;
    } = {
      shortURL: `${this.hostLink}${urlCode}`,
      id: id,
    };
    this.makeRoute(urlCode, data.longURL);
    return shortURLData;
  }

  router(): RequestHandler {
    return (req: Request, res: Response) => {
      const data = this.genShortURL(req.body);
      res.json(data).send();
    };
  }
}
