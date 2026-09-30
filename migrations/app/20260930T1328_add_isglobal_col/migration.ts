#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/584be966a1522bb6350230d04778e9c837c9201bb4e5f85a3e67484c77bb6f91/contract';
import startContract from '../../snapshots/584be966a1522bb6350230d04778e9c837c9201bb4e5f85a3e67484c77bb6f91/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ac1ff884598034dab27099ca88bbcb15d23764487a78aaef3e7bc2e8321ed033/contract';
import endContract from '../../snapshots/ac1ff884598034dab27099ca88bbcb15d23764487a78aaef3e7bc2e8321ed033/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Note',
        column: col('isGlobal', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
