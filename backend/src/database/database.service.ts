import { Injectable, OnModuleInit } from '@nestjs/common';
import { createPool } from 'mysql2';
import { Kysely, MysqlDialect } from 'kysely';
import { Database } from './types';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private kyselyInstance: Kysely<Database>;

  async onModuleInit() {
    const dialect = new MysqlDialect({
      pool: createPool({
        database: 'inventory',
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT) || 3306,
        connectionLimit: 10,
      })
    });

    this.kyselyInstance = new Kysely<Database>({
      dialect,
    });
  }

  getKyselyInstance(): Kysely<Database> {
    if (!this.kyselyInstance) {
      throw new Error('Kysely instance not initialized');
    }
    return this.kyselyInstance;
  }
}

