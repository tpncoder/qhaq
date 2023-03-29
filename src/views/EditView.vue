<script lang="ts" setup>
	import { onMounted, ref, watch } from 'vue';
	import { supabase } from '../scripts/supabase'; 
	import { RouterLink } from 'vue-router';

	const title = ref("");
	const content = ref("");
	const summary = ref("");
	const tags = ref("");
	const id = ref();


	const submit = async () => {
		if(!title.value || !content.value || !summary.value || !id.value) {
			return console.log("fill all fields");
		}	

		const { data, error } = await supabase
																		.from("articles")
																		.update({
																			title: title.value,
																			content: content.value,
																			summary: summary.value,
																		})
																		.eq("id", id.value);

		console.log("edited");
		console.log(Date.now())
	}
</script>

<template>
	<div class="">
		<div class="absolute top-10 w-1/3">
			<input placeholder="id" v-model="id" class="w-full border border-neutral-100 block p-3 mb-5 text-md outline-none placeholder:text-left placeholder:text-sm">
			<input placeholder="title" v-model="title" class="w-full border border-neutral-100 block p-3 mb-5 text-md outline-none placeholder:text-left placeholder:text-sm">
			<textarea placeholder="content" v-model="content" class="w-full border border-neutral-100 block p-3 mb-5 text-md outline-none placeholder:text-left placeholder:text-sm resize-none h-52"></textarea>
			<input placeholder="summary" v-model="summary" class="w-full border border-neutral-100 block p-3 mb-5 text-md outline-none placeholder:text-left placeholder:text-sm">
			
			<button @click="submit" class="w-full p-3 text-sm bg-neutral-900 text-white">Done</button>
		</div>
		<div class="relative h-96 w-1/2 float-right p-3" id="preview">
			<h1>{{ title }}</h1>
			<div v-html="content"/>
		</div>
	</div>
</template>

<style scoped>
body {
  overflow: hidden; /* Hide scrollbars */
}

@tailwind base;
@tailwind components;
@tailwind utilities;

:-ms-input-placeholder { 
	font-family: "Inria Serif";
	text-align: left;
	font-size: 15px;
	color: var(--font-color);
}

::placeholder {
	font-family: "Inria Serif";
	font-size: 15px;
	color: var(--font-color);
	text-align: left;
}

label{
	margin-bottom: 100px;
}

#preview{
	border: 1px solid var(--border-color);
	color: var(--font-color);
	overflow-y: scroll;
	font-size: 20px;
}

#preview h1{
	font-size: 40px;
	text-align: center;
	font-weight: bold;
}
</style>
