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
		if(!title.value || !content.value || !summary.value || !filter.value ) {
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
	<h1 class="text-3xl px-10 pt-10 font-bold" v-if="!loggedIn">Welcome<br>back !</h1>
	<div class="h-screen w-full flex px-5 mt-10">
		<div class="p-5 w-80 dark:border-neutral-500">
			<label for="email" class="text-base font-extralight pb-11 dark:text-white" v-if="!loggedIn">Email</label>

			<input v-model="email" v-if="!loggedIn" class="w-full border border-neutral-100 block p-3 mb-5 text-md outline-none placeholder:text-left placeholder:text-sm" placeholder="Enter your email" id="email">	

			<label for="password" class="text-base font-extralight pb-11 dark:text-white" v-if="!loggedIn">Password</label>

			<input v-model="password" v-if="!loggedIn" type="password" class="w-full border border-neutral-100 block p-3 mb-5 text-md outline-none placeholder:text-sm" placeholder="Enter your password" id="password">	

			<button 
				class="relative left-[50%] translate-x-[-50%] dark:bg-neutral-200 p-4 text-md font-sans w-full bg-neutral-900 text-white dark:bg-neutral-900" 
				@click="() => { 
					if ( email == actEmail && password == actPassword ) {
						loggedIn = true;
					}
				}"
 				v-if="!loggedIn">Submit</button>
		</div>
	</div>

	<div class="h-screen w-full flex px-5 mt-10 justify-center">
		<div class="absolute top-10 w-1/3" v-if="loggedIn">
			<input placeholder="title" v-model="title" class="w-full border border-neutral-100 block p-3 mb-5 text-md outline-none placeholder:text-left placeholder:text-sm">
			<input placeholder="summary" v-model="summary" class="w-full border border-neutral-100 block p-3 mb-5 text-md outline-none placeholder:text-left placeholder:text-sm">
			<input placeholder="filter" v-model="filter" class="w-full border border-neutral-100 block p-3 mb-5 text-md outline-none placeholder:text-left placeholder:text-sm">
			<textarea placeholder="content" v-model="content" class="w-full border border-neutral-100 block p-3 mb-5 text-md outline-none placeholder:text-left placeholder:text-sm resize-none h-52"></textarea>
			<button @click="submit" class="w-full p-3 text-sm bg-neutral-900 text-white">Done</button>
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
</style>
