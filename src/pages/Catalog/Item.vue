<script setup>
import { useMutations } from 'vuex-composition-helpers/dist';
const { ADD_PRODUCT } = useMutations(['ADD_PRODUCT']);
const props = defineProps({ data: Object })
const item = props.data;

const addToBasket = (id) => {
	ADD_PRODUCT(id);
}

const getEuro = (price) => `${Math.floor(Number(price) / 102)} € – ${Math.floor(Number(price))} €`;
const getRuble = (price) => `${Math.floor(Number(price) / 8.2)} ₽ – ${Number(price)} ₽`;
const getImage = (imgName) => new URL(`../../assets/images/${imgName}`, import.meta.url).href;

</script>

<template>
	<div class="product">
		<img class="product__image" :src="getImage(item.image)">
		<h3 class="product__name">{{ item.model }}</h3>
		<p class="product__placeholder">{{ item.placeholder }}</p>
		<div class="product__price">
			<span class="ruble">{{ getRuble(item.price) }}</span>
			<span class="euro">{{ getEuro(item.price) }}</span>
		</div>
		<button class="product__add" @click="addToBasket(item.id)">В корзину</button>
	</div>
</template>


<style lang="scss" scoped>
.product {
	background: $light;
	padding: 2em;
	display: flex;
	flex-direction: column;
	user-select: none;

	&__image {
		width: 80%;
		align-self: center;
		object-fit: contain;
		aspect-ratio: 1/1;
		user-select: none;
		object-position: center center;
		pointer-events: none;
		margin-bottom: 1em;
	}


	&__add {
		border: none;
		color: $white;
		background: $blue;
		width: 100%;
		text-align: center;
		padding: 0.5em;
		font-weight: 500;
		cursor: pointer;
	}

	&__name {
		font-size: 2em;
		font-weight: 600;
	}

	&__placeholder {
		font-size: 0.8em;
		font-weight: 500;
	}

	&__price {
		margin: 2em 0;
		display: flex;
		flex-direction: column;
		font-weight: 600;

		.ruble {
			font-size: 1.5em;
		}

		.euro {
			color: $gray;
			font-size: 1.1em;
			font-weight: 400;
		}
	}

}
</style>
