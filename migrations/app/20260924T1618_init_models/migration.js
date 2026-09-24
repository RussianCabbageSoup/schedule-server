#!/usr/bin/env -S node
import endContract from '../../snapshots/1f0d35f010d29565e1eddc990ddddb7c846e9d6e57faea3ac159584f54e6e625/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';
export default class M extends Migration {
    endContractJson = endContract;
    get operations() {
        return [
            this.createSchema({ schema: 'public' }),
            this.createTable({
                schema: 'public',
                table: 'Note',
                columns: [
                    col('content', 'text', { codecRef: { codecId: 'pg/text@1' } }),
                    col('createdAt', 'timestamptz', {
                        notNull: true,
                        default: fn('now()'),
                        codecRef: { codecId: 'pg/timestamptz-string@1' },
                    }),
                    col('id', 'character(36)', {
                        notNull: true,
                        codecRef: { codecId: 'sql/char@1', typeParams: { length: 36 } },
                    }),
                    col('userId', 'character(36)', {
                        notNull: true,
                        codecRef: { codecId: 'sql/char@1', typeParams: { length: 36 } },
                    }),
                ],
                constraints: [primaryKey(['id'])],
            }),
            this.createTable({
                schema: 'public',
                table: 'User',
                columns: [
                    col('createdAt', 'timestamptz', {
                        notNull: true,
                        default: fn('now()'),
                        codecRef: { codecId: 'pg/timestamptz-string@1' },
                    }),
                    col('id', 'character(36)', {
                        notNull: true,
                        codecRef: { codecId: 'sql/char@1', typeParams: { length: 36 } },
                    }),
                    col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                    col('username', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                ],
                constraints: [primaryKey(['id'])],
            }),
        ];
    }
}
MigrationCLI.run(import.meta.url, M);
//# sourceMappingURL=migration.js.map