import { DatabaseController } from './database.controller';
const ex = require('express');
import {
  Request as req,
  Response as res,
  RequestHandler as reqHandler,
  Router as router,
  Application as app,
} from 'express';
import { fetchData } from './routerResponse';

/**
 * @Server
 */

export interface Class<T> extends Function {
  new (...args: any[]): T;
}
export interface ViewArg {
  path: string;
  view: Class<any>;
}
export interface ServerArg {
  middleware: reqHandler[];
  view: ViewArg[];
  database?: Class<any>;
}
export interface ViewInt {
  router(): reqHandler;
}

/**
 * @Database
 */
export type Database = DatabaseController;

/**
 * @Express
 */

export interface NextFunction {
  (err?: any): void;
  /**
   * "Break-out" of a router by calling {next('router')};
   * @see {https://expressjs.com/en/guide/using-middleware.html#middleware.router}
   */
  (deferToNext: 'router'): void;
}
export type Request = req;
export type Response = res;
export type Next = NextFunction;
export type RequestHandler = reqHandler;
export type Application = app;
export type Router = router;
export const Router = router;
export const express = ex;
export const FetchData = fetchData;
