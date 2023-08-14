import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { create } from 'xmlbuilder2';

@Injectable()
export class XmlBuilderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body && typeof req.body === 'object') {
      const xmlPayload = create(req.body).end({ prettyPrint: true });
      req.body = xmlPayload;
      res.setHeader('Content-Type', 'application/xml');
    }
    next();
  }
}
