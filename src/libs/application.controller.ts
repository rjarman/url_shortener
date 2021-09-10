import {
  express,
  Application,
  RequestHandler,
  Router,
  ViewArg,
  ServerArg,
} from './server.types';
import { Color } from './server.types';
import { port, address, publicFolder } from './config.server.json';
import path from 'path';
import { DatabaseController } from './database.controller';

export class ApplicationHandler {
  /**
   * This class handles all the handlers, middleware, public folders and server creation!
   */

  private __port = process.env.PORT || port;
  // private __address = address;

  private __app: Application;
  private __middleware: RequestHandler[];
  private __views: ViewArg[];
  private __database: DatabaseController;
  private __publicFolder: string;

  constructor(serverArg: ServerArg) {
    this.__app = express();

    this.__middleware = serverArg.middleware;
    this.__views = serverArg.view;
    if (serverArg.database) {
      this.__database = new serverArg.database();
    } else {
      this.__database = new DatabaseController();
    }
    this.__publicFolder = path.resolve(__dirname, publicFolder);
    this.__loadMiddleware();
    this.__loadAssets();
    this.__loadViews();
  }

  private __loadMiddleware(): void {
    this.__middleware.forEach((middleware) => {
      this.__app.use(middleware);
    });
  }

  private __loadViews(): void {
    this.__views.forEach((view) => {
      let viewerObject = new view.view(this.__app, this.__database);
      let redirectLink: Router = Router();
      redirectLink.all(view.path, viewerObject.router());
      this.__app.use('/', redirectLink);
    });
  }

  private __loadAssets(): void {
    this.__app.use(express.static(this.__publicFolder));
  }

  listen(): void {
    const _ = this.__app.listen(this.__port, () => {
      console.log(
        Color.custom.green('Server started at ') +
          `http://${JSON.parse(JSON.stringify(_.address())).address}:${
            this.__port
          }/`
      );
    });
  }
}
