import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon } from '@neondatabase/serverless';

const runMigrations = async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set in environment variables');
    }

    const sql = neon(databaseUrl);
    const db = drizzle(sql);

    console.log('Starting database migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Database migrations completed successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  runMigrations();
}

export default runMigrations;