import React from "react";

export interface ICustomTableHeaderTypes {
  value: string;
  label: string;
  fieldType: string;
  palceHolder: string;
  isReadOnly?: boolean;
  isNumberOnly?: boolean;
  isLastColumn?: boolean;
}

export interface ICustomIndexedTableBody {
  [key: string]: number | string | undefined;
  className?: string;
}