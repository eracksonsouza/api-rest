//quando tem a extensao .d.ts eh um arquivo de declaracao de tipos
// que so serve para o Typescript entender os tipos de uma biblioteca

import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    transactions: {
      id: string;
      title: string
      amount: number
      created_at: string
      session_id?: string
    };
  }
}
