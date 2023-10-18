import productsData from './products.json';

export default {
	state: {
		products: [...productsData],
		basket: [],
	},
	mutations: {
		ADD_PRODUCT(state, id) {
			let products = [...state.products];
			let basket = state.basket;
			let hasItem = basket.find(el => el.id === id);
			let newItem = products.find(el => el.id === id);

			if (hasItem) hasItem.quantity = hasItem.quantity + 1;
			else state.basket.unshift({ ...newItem, quantity: 1 });
		},
		DELETE_PRODUCT(state, id) {
			let index = state.basket.findIndex(el => el.id !== id);
			state.basket.splice(index, 1);
		},
		CLEAR_BASKET(state) {
			let all = state.basket.length;
			state.basket.splice(0, all);
		},
		INC_PRODUCT(state, id) {
			let findItem = state.basket.find(el => el.id === id);
			if (!findItem) return;
			findItem.quantity = findItem.quantity + 1;
		},
		DEC_PRODUCT(state, id) {
			let findItem = state.basket.find(el => el.id === id);
			if (!findItem) return;
			if (findItem.quantity <= 1) return;
			findItem.quantity = findItem.quantity - 1;
		},
	}
};