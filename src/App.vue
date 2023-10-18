<script setup>
import { RouterView } from "vue-router";
import { Header } from '@/components';

</script>

<template>
	<div class="wrapper">
		<Header />
		<RouterView></RouterView>
	</div>
</template>


<style lang="scss" scoped></style>
