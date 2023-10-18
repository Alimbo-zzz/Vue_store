<script setup>
import { ref, watch, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import Item from './item.vue';
import { useStore } from "vuex";
const { products } = useStore().state.basket;

const swiperData = ref(null);
const activeSlideIndex = ref(0);
const previousIndex = ref(4);
const slideIsEnd = ref(false);
const slideIsStart = ref(true);
const sliderResponsive = {
	0: { slidesPerView: 1, slidesPerGroup: 1 },
	768: { slidesPerView: 2, slidesPerGroup: 2 },
	1024: { slidesPerView: 3, slidesPerGroup: 3 },
	1280: { slidesPerView: 4, slidesPerGroup: 4 }
}



const checkMedia = () => {
	const media = (width) => window.matchMedia(`(min-width: ${width}px)`).matches;

	(media(0)) && (previousIndex.value = 12);
	(media(768)) && (previousIndex.value = 6);
	(media(1024)) && (previousIndex.value = 4);
	(media(1280)) && (previousIndex.value = 3);
}
const checkButtons = (e) => {
	if (e <= 0) slideIsStart.value = true;
	if (e > 0) {
		slideIsStart.value = false;
		slideIsEnd.value = false;
		if (e >= previousIndex.value - 1) slideIsEnd.value = true;
	}
}
const onSwiper = (swiper) => swiperData.value = swiper;
const changeSlide = e => activeSlideIndex.value = e.snapIndex;


watch(activeSlideIndex, checkButtons)
onMounted(() => {
	window.onresize = checkMedia;
	checkMedia();
})

</script>

<template>
	<div class="catalog">
		<div class="container">
			<div class="catalog__head">
				<h1 class="catalog__title">Каталог товаров</h1>
				<div class="catalog__controlls">
					<button @click="swiperData.slidePrev()" :disabled="slideIsStart" data-btn="prev"><img
							src="@icons/arrow-left.svg"></button>
					<div data-controlls="pag">
						<span data-controlls="active">{{ String(activeSlideIndex + 1).padStart(2, "0") }}</span>
						/
						<span data-controlls="length">{{ String(previousIndex).padStart(2, "0") }}</span>
					</div>
					<button @click="swiperData.slideNext()" :disabled="slideIsEnd" data-btn="next"><img
							src="@icons/arrow-right.svg"></button>
				</div>
			</div>
			<Swiper :onSlideChange="changeSlide" @swiper="onSwiper" :spaceBetween="30" :breakpoints="sliderResponsive">
				<SwiperSlide v-for="(item, i) in products" :key="i">
					<Item :data="item" />
				</SwiperSlide>
			</Swiper>
		</div>
	</div>
</template>


<style lang="scss" scoped>
@import "./style.scss";
</style>
