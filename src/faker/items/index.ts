import { faker } from '@faker-js/faker/locale/en_IND';

import { IItem } from '../../types';

export const fakeItems = (): IItem[] => {
	const data: IItem[] = Array.from({ length: 20 }).map(() => {
		return {
			id: faker.datatype.number(),
			name: faker.helpers.arrayElement([
				'Pongal',
				'Masala dosa',
				'Chicken 65',
				'Sambar',
				'Pulihora',
				'Appam',
				'Upma',
				'Hyderabadi biryani',
			]),
			price: Number(faker.commerce.price(50, 200)),
			gst: faker.datatype.number({
				min: 1,
				max: 10,
				precision: 0.01,
			}),
		} as IItem;
	});
	return data;
};
