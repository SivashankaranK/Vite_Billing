import React from "react";

export interface ICustomTableColumn {
  identifier: string;
  label: React.ReactNode;
}

export interface ICustomIndexedTableBody {
  [key: string]: React.ReactNode;
  className?: string;
}