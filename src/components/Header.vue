<script setup>
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
import { watch, ref, onMounted } from "vue";
const { basket } = useStore().state.basket;

const quantity = ref(0);
const sum = ref(0);

const setData = (e) => {
	let new_quantity = 0;
	let new_sum = 0;
	e.forEach(el => {
		new_quantity += el.quantity;
		new_sum += (el.quantity * el.price);
	})
	quantity.value = new_quantity;
	sum.value = new_sum;
}

watch(basket, setData);
onMounted(() => setData(basket));



</script>

<template>
	<header class="header">
		<div class="container">
			<nav class="header__nav">
				<RouterLink to="/" data-name="main">Все товары</RouterLink>
				<RouterLink to="/basket" data-name="basket">
					<img data-name="image" src="@icons/basket.svg">
					<span data-name="text">Ваша корзина</span>
					<span data-name="quantity">{{ quantity }} товаров</span>
					<span data-name="sum">{{ sum }} ₽</span>
				</RouterLink>
			</nav>
		</div>
	</header>
</template>


<style lang="scss" scoped>
.header {
	padding: 2em 0;

	&__nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		user-select: none;
	}


	[data-name="main"] {
		font-size: 1.5em;
		font-weight: 600;
		text-decoration: underline;
	}


	[data-name='basket'] {
		display: grid;
		grid-template-columns: min-content 1fr;
		align-items: center;
		gap: 0em 0.5em;
	}

	[data-name='image'] {
		grid-row: 1/5;
		width: 4em;
	}

	[data-name="text"] {
		font-weight: 600;
		font-size: 0.9em;
	}


	[data-name="quantity"] {
		color: $gray;
		font-size: 0.8em;
	}

	[data-name="sum"] {
		font-weight: 500;
		font-size: 0.8em;
	}
}
</style>
