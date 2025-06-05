// src/middlewares/index.js

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const applyMiddlewares = (app) => {
  app.use(helmet());

  app.use(cors({
    origin: ['http://localhost:5173','http://localhost:3000'], // frontend'in adresini buraya yaz
    credentials: true,
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};
