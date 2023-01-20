import { faker } from '@faker-js/faker';
import { IExportDataList } from '../../types';
import { fakeCustomersList } from '../customers';
import { fakeItems } from '../items';
import dayjs from 'dayjs';

export const fakeExportData = (): IExportDataList[] => {
	const data: IExportDataList[] = Array.from({ length: 20 }).map(() => {
		return {
			billDate: dayjs(faker.date.past()).format('YYYY/MM/DD'),
			customer: fakeCustomersList()[0],
			id: faker.datatype.number(),
			menuItem: fakeItems()[0],
			quantity: faker.datatype.number({
				max: 500,
				min: 100,
			}),
			totalAmount: Number(faker.commerce.price(5000, 10000)),
		} as IExportDataList;
	});
	return data;
};
