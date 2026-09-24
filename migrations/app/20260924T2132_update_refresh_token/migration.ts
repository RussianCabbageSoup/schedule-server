#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/53d1506e764bf9b7a7f78988265893690749a1fb4b7c49e00ff7cc1d95794ab8/contract';
import startContract from '../../snapshots/53d1506e764bf9b7a7f78988265893690749a1fb4b7c49e00ff7cc1d95794ab8/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/7b0013bc9ec588f44e3eca572d03be976bec2981c497af72760325f829c0fad6/contract';
import endContract from '../../snapshots/7b0013bc9ec588f44e3eca572d03be976bec2981c497af72760325f829c0fad6/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'RefreshToken',
        column: col('token', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-RefreshToken-token', {
        check: () => placeholder('backfill-RefreshToken-token:check'),
        run: () => placeholder('backfill-RefreshToken-token:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'RefreshToken', column: 'token' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
