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
	<input v-model="email" v-if="!loggedIn">	
	<input v-model="password" v-if="!loggedIn" type="password">	
	<button @click="submit" v-if="!loggedIn">submit</button>

	<div v-if="loggedIn">
		<h2>
			<RouterLink to='/create/article/'>create new article</RouterLink>
		</h2>
		<div class="articles" v-for="article in articles" :key="article.id">
			<div class="card">
				<h1>
					<RouterLink :to="'/edit/article/' + article.id">{{ article.title }}</RouterLink>
				</h1>
			</div>
		</div>
	</div>
</template>

<style scope>
input, button{
	padding: 0.5rem;
	border-width: 1px;
  border-color: #352C2C40;
  margin-bottom: 5vh;
  background-color: #070707;
  color: white;
	width: 8%;
	padding: 0.7rem;
	margin-left: 1.5rem;
	outline: none;
	transition: ease-in 0.3s border;
}

input:focus{
	border: 1px solid #dadada;
}

</style>
