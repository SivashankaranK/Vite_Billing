import { faker } from '@faker-js/faker/locale/en_IND';
import { IbillingResponce } from '../../types';
import dayjs from 'dayjs';
import { fakeCustomersList } from '../customers';
import { fakeItems } from '../items';

export const fakeBillingData = (): IbillingResponce[] => {
	const data: IbillingResponce[] = Array.from({ length: 20 }).map(() => {
		return {
			billDate: dayjs(faker.date.past()).format('YYYY/MM/DD'),
			customer: fakeCustomersList()[0],
			id: faker.datatype.number(),
			menuItem: fakeItems()[0],
			quantity: faker.datatype.number({
				max: 500,
				min: 50,
			}),
			totalAmount: Number(faker.commerce.price(1000, 10000)),
		} as IbillingResponce;
	});
	return data;
};
