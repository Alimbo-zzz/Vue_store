<script setup>
import { useMutations } from 'vuex-composition-helpers/dist';
const { DELETE_PRODUCT, INC_PRODUCT, DEC_PRODUCT } = useMutations(['DELETE_PRODUCT', 'INC_PRODUCT', 'DEC_PRODUCT']);
const props = defineProps({ data: Object })
const item = props.data;

const getSum = (item) => item.quantity * item.price;
const getImage = (imgName) => new URL(`../../assets/images/${imgName}`, import.meta.url).href;


</script>

<template>
	<div class="product">
		<img :src="getImage(item.image)" class="product__img">
		<div class="product__info">
			<h4 class="product__name">{{ item.name }} {{ item.model }}</h4>
			<p class="product__description">{{ item.placeholder }}</p>
			<article class="product__article">Артикул: {{ item.article }}</article>
		</div>
		<div class="product__controlls">
			<button @click="DEC_PRODUCT(item.id)" data-name="increment">–</button>
			<div data-name="quantity">{{ item.quantity }}</div>
			<button @click="INC_PRODUCT(item.id)" data-name="decrement">+</button>
			<div data-name="one-price">{{ item.price }} ₽/шт.</div>
		</div>
		<div class="product__price">{{ getSum(item) }} ₽</div>
		<button @click="DELETE_PRODUCT(item.id)" class="product__remove"><img src="@icons/cross.svg"></button>
	</div>
</template>


<style lang="scss" scoped>
@import "./style.scss";
</style>
