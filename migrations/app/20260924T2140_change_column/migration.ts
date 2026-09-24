#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/584be966a1522bb6350230d04778e9c837c9201bb4e5f85a3e67484c77bb6f91/contract';
import endContract from '../../snapshots/584be966a1522bb6350230d04778e9c837c9201bb4e5f85a3e67484c77bb6f91/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/7b0013bc9ec588f44e3eca572d03be976bec2981c497af72760325f829c0fad6/contract';
import startContract from '../../snapshots/7b0013bc9ec588f44e3eca572d03be976bec2981c497af72760325f829c0fad6/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_username_key',
        columns: ['username'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
