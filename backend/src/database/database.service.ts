import { Injectable } from '@nestjs/common';
import { createPool } from 'mysql2';
import { Kysely, MysqlDialect } from 'kysely';
import { Database } from './types';
import 'dotenv/config'

@Injectable()
export class DatabaseService extends Kysely<Database> {
  
  constructor() {
    const dialect = new MysqlDialect({
      pool: createPool({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: parseInt(process.env.DB_PORT) || 3306,
        connectionLimit: 10,
      })
    });

    super({
      dialect
    });
  }
}
