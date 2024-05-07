import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config'

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly VALID_API_KEY = process.env.API_KEY;

  use(req: Request, res: Response, next: NextFunction): void {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    if (apiKey !== this.VALID_API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }

    next();
  }
}

