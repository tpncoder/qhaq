<script lang="ts" setup>
	import { onMounted, ref, watch } from 'vue';
	import { supabase } from '../scripts/supabase'; 
	import { RouterLink } from 'vue-router';

	const email = ref('');
	const password = ref('');
	const actEmail = ref('');
	const actPassword = ref('');

	const loggedIn = ref(false);

	const submit = () => {
		if ( email.value == actEmail.value && password.value == actPassword.value ) {
			loggedIn.value = true;
		}
	}

	const articles = ref([])

	onMounted(async () => {
		console.error("YOU ARE NOW ACCESSING THE ADMINISTRATOR PANEL!!!")
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

	watch(loggedIn, async (currentStatus) => {
		if (currentStatus) {
			const { data, error } = await supabase
																			.from("articles")
																			.select();

			if( data ) {
				articles.value = data;
				return;
			}
		}	
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

			<button class="relative left-[50%] translate-x-[-50%] dark:bg-neutral-200 p-4 text-md font-sans w-full bg-neutral-900 text-white dark:bg-neutral-900" @click="submit" v-if="!loggedIn">Submit</button>
		</div>
	</div>

	<div v-if="loggedIn" class="absolute top-0">
		<h2 class="text-xl m-5 border border-neutral-200 p-2 hover:bg-neutral-200 dark:border-neutral-500 dark:text-white dark:hover:bg-neutral-600">
			<RouterLink to='/create/article/'>Create New Article</RouterLink>
		</h2>
		<div class="articles" v-for="article in articles" :key="article.id">
			<div class="card">
				<h1 class="text-2xl mx-5 p-2">
					<RouterLink :to="'/edit/article/' + article.id">{{ article.title }}</RouterLink>
				</h1>
			</div>
		</div>
	</div>
</template>

<style scoped>
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
