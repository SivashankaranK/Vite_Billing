import { ICustomer } from '../../types';
import { faker } from '@faker-js/faker/locale/en_IND';

export const fakeCustomersList = (): ICustomer[] => {
	const data: ICustomer[] = Array.from({ length: 20 }).map(() => {
		return {
			id: faker.datatype.number(),
			name: faker.company.name(),
			mobileNumber: faker.phone.number(),
		} as ICustomer;
	});
	return data;
};
