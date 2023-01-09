import { ICustomIndexedTableBody } from '../custom-table';

export interface IItems extends ICustomIndexedTableBody {
	id?: number;
	name: string;
	isActive: boolean;
}
