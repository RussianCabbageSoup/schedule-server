#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/1f0d35f010d29565e1eddc990ddddb7c846e9d6e57faea3ac159584f54e6e625/contract';
import startContract from '../../snapshots/1f0d35f010d29565e1eddc990ddddb7c846e9d6e57faea3ac159584f54e6e625/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/53d1506e764bf9b7a7f78988265893690749a1fb4b7c49e00ff7cc1d95794ab8/contract';
import endContract from '../../snapshots/53d1506e764bf9b7a7f78988265893690749a1fb4b7c49e00ff7cc1d95794ab8/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  placeholder,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'RefreshToken',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('expireAt', 'timestamp', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-temporal@1' },
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
        table: 'Note',
        columns: [
          col('id', 'character(36)', { notNull: true, codecRef: { codecId: 'sql/char@1', typeParams: { length: 36 } } }),
          col('userId', 'character(36)', { notNull: true, codecRef: { codecId: 'sql/char@1', typeParams: { length: 36 } } }),
          col('content', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('date', 'timestamp', { notNull: true, codecRef: { codecId: 'pg/timestamp-temporal@1' } }),
          col('createdAt', 'timestamptz', { notNull: true, default: fn('now()'), codecRef: { codecId: 'pg/timestamptz-string@1' } }),
        ],
        constraints: [primaryKey(['id'])],

      })
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
