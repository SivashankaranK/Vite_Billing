import { ICustomIndexedTableBody } from '../custom-table';

export interface IItem extends ICustomIndexedTableBody {
	id?: number;
	name: string;
	price: number;
	gst?: number;
}

export interface IItemState {
	isFetching: boolean;
	itemList: IItem[];
}
