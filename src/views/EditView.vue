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
																			tags: tags.value
																		})
																		.eq("id", id.value);

		console.log("edited")
	}
</script>

<template>
	<input placeholder="id" v-model="id">
	<input placeholder="title" v-model="title">
	<input placeholder="content" v-model="content">
	<input placeholder="summary" v-model="summary">
	<input placeholder="tags" v-model="tags">
	<button @click="submit">submit</button>
</template>
