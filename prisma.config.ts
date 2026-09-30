import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

const dbUrl = process.env.NODE_ENV === 'development' 
  ? process.env.LOCAL_DATABASE_URL! 
  : process.env.DATABASE_URL!;

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/prisma/contract.ts",
    db: {
      connection: dbUrl,
    },
  }),
});
