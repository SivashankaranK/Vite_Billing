import { ICustomIndexedTableBody } from '../custom-table';

export interface IItem extends ICustomIndexedTableBody {
	id: number;
	name: string;
	price: number;
	gstValue?: number;
}

export interface IItemState {
	isItemFetching: boolean;
	itemList: IItem[];
}
