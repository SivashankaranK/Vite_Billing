import React from "react";

export interface ICustomTableColumn {
  identifier: string;
  label: string;
  type: string;
  visible: boolean;
}

export interface ICustomIndexedTableBody {
  [key: string]: number | string | undefined;
  className?: string;
}