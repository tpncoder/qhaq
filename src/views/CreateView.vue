
<script lang="ts" setup>
	import { onMounted, ref, watch } from 'vue';
	import { supabase } from '../scripts/supabase'; 
	import { RouterLink } from 'vue-router';

	const title = ref("");
	const content = ref("");
	const summary = ref("");
	const tags = ref("");
	const filter = ref("");
	
	const loggedIn = ref(false);

	const email = ref('');
	const password = ref('');
	
	const actEmail = ref('');
	const actPassword = ref('');

	const submit = async () => {
		if(!title.value || !content.value || !summary.value || !filter.value || !tags.value ) {
			return console.log("fill all fields");
		}	

		const { data, error } = await supabase
																		.from("articles")
																		.insert({
																			title: title.value,
																			content: content.value,
																			summary: summary.value,
																			filter: filter.value,
																			tags: tags.value
																		})

		console.log("edited")
	}

	onMounted(async () => {
		async function setEmail() {
			const { data, error } = await supabase
																	.from("admin")
																	.select();

			if (data) {
				actEmail.value = data[0].email;
				actPassword.value = data[0].password;
			}
		}
		setEmail();
	})
</script>

<template>
	<input v-model="email" v-if="!loggedIn">	
	<input v-model="password" v-if="!loggedIn" type="password">	
	<button 
		@click="() => {
			if ( email == actEmail && password == actPassword ) {
				loggedIn = true;
			}
		}"
		v-if="!loggedIn"
	>Log In</button>
	
	<div class="form" v-if="loggedIn">
		<input placeholder="title" v-model="title">
		<input placeholder="content" v-model="content">
		<input placeholder="summary" v-model="summary">
		<input placeholder="tags" v-model="tags">
		<input placeholder="filter" v-model="filter">
		<button @click="submit">submit</button>
	</div>
</template>

<style scoped>
input{
	display: block;
}
</style>
