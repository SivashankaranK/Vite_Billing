import React from "react";

export interface ICustomTableColumn {
  identifier: string;
  label: string;
}

export interface ICustomIndexedTableBody {
  [key: string]: number | string | undefined;
  className?: string;
}