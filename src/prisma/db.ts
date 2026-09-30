import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

const dbUrl = process.env.NODE_ENV === 'development' 
  ? process.env.LOCAL_DATABASE_URL! 
  : process.env.DATABASE_URL!;

export const db = postgres<Contract>({
  contractJson,
  url: dbUrl,
});

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];