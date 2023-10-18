<script setup>
import { useMutations } from 'vuex-composition-helpers/dist';
const { CLEAR_BASKET } = useMutations(['CLEAR_BASKET']);
import { ref, watch, onMounted } from 'vue';
import { useStore } from "vuex";
const { basket } = useStore().state.basket;
import Product from './Product.vue';

const quantity = ref(0);
const sum = ref(0);
const install = ref(false);
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

const buyProducts = (e) => {
	let basketData = {
		data: [...basket],
		quantity,
		sum,
		install
	};
	console.log(basketData);
	CLEAR_BASKET();
}

watch(basket, setData);
onMounted(() => setData(basket));

</script>

<template>
	<div class="basket">
		<div class="container">
			<div class="basket__head">
				<h2 class="basket__title">Ваша корзина</h2>
				<div class="basket__quantity">{{ sum }} товаров</div>
				<button @click="CLEAR_BASKET" class="basket__reset">Очистить корзину</button>
			</div>

			<div class="basket__content">
				<ul class="basket__list">
					<li class="basket__item" v-for="item in basket" :key="item.id">
						<Product :data="item" />
					</li>
				</ul>

				<div class="basket__result">
					<div class="result">
						<h3 class="result__title">Итого</h3>
						<ul class="result__list">
							<li class="result__item">
								<div data-item="title">Сумма заказа</div>
								<div data-item="value">{{ sum }} ₽</div>
							</li>
							<li class="result__item">
								<div data-item="title">Количество</div>
								<div data-item="value">{{ quantity }} шт</div>
							</li>
							<li class="result__item">
								<div data-item="title">Установка</div>
								<div data-item="value">{{ install ? "Да" : "Нет" }}</div>
							</li>
						</ul>
						<hr>
						<div class="result__price">
							<div data-name="title">Стоимость товаров</div>
							<div data-name="value">{{ sum }} ₽</div>
						</div>
						<button @click="buyProducts" data-btn="order" class="result__btn">Оформить заказ</button>
						<button @click="buyProducts" data-btn="one-click" class="result__btn">Купить в 1 клик</button>
					</div>
				</div>

				<div class="basket__install">
					<input type="checkbox" v-model="install">
					<div data-name="image">
						<img src="@icons/ops.svg">
					</div>
					<div data-name="content">
						<h4>Установка</h4>
						<p>Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
@import "./style.scss";
</style>
