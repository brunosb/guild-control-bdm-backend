import { createConnections } from 'typeorm';

createConnections([
  {
    name: 'default',
    type: 'postgres',
    host: '192.168.99.100',
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'bdm_brasucas',
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: '192.168.99.100',
    port: 27017,
    database: 'bdm_brasucas',
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  },
]);
