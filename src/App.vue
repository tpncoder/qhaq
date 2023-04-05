<script setup lang="ts">
import { inject } from '@vercel/analytics';

import { RouterView, RouterLink } from 'vue-router'

inject();
</script>

<template>
	<nav>
		<ul>
			<li><RouterLink to="/">Home</RouterLink></li>
			<li><RouterLink to="/admin/">Admin</RouterLink></li>
			<li><RouterLink to="/about/">About</RouterLink></li>
		</ul>
	</nav>
  <RouterView />
</template>

<style>
nav{
	background-color: var(--card-bg-color);
	width: 99%;
	margin: 0;
	padding: 0.7em;
	position: relative;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	font-family: "Inria Sans";
}

nav > ul > li {
	display: inline-block;
	font-size: 1.2em;
}

nav > ul > li:not(:first-child){
	margin-left: 2em;
}
</style>
