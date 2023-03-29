<script lang="ts" setup>
  import { supabase } from "../scripts/supabase"
  import { onMounted, ref, watch } from "vue"
  import { RouterLink } from "vue-router";

	// TODO: Reduce amt. of variables
  const loaded = ref(false);
  const articles = ref();
  const filter = ref();
	const sFilter = ref();
	const found = ref(true);

	const filters = [ "Coding", "Hacking", "Open Source", "News", "Guide", "Linux" ];

  watch(filter, async (currentFilter) => {
    const { data, error } = await supabase
																		.from("articles")
																		.select()
																		.eq("filter", currentFilter.toLowerCase());
		if(!data) return console.log(error);

    if (currentFilter.toLowerCase() !== "none"){
      articles.value = data;
      loaded.value = true;  
    }
		
		if (data.length == 0) return found.value = false;
  })

  onMounted(async () => {
    const { data, error } = await supabase
																		.from("articles")
																		.select();

		if(!data) return console.log(error)
		console.log(data)

    if (data) {
      articles.value = data;
      loaded.value = true;  
    } 
	})

	// function to search for articles based on input query 
	async function articleSearch(title: String){
		let { data, error } = await supabase
																	.from("articles")
																	.select()

		if (!data) return;

		const filtData = data.filter(datum => datum.title.toLowerCase().trim().includes(title.toLowerCase().trim()));
		console.log(filtData)

		if (title.trim().length !== 0 && data.length > 0) {
			articles.value = filtData;
      loaded.value = true;  
			found.value = true;
		} else {
			let { data, error } = await supabase.from("articles").select()

			articles.value = data;
			loaded.value = true;

			found.value = true;
		}
	}
</script>


<template>
	<RouterLink to="admin/">Admin Panel</RouterLink>
  <div class="banner">
		<h1>
			<span style="color: #ffa112">Q</span>
			- Blog  
		</h1>
    <h3 class="tagline">The hub of tech facts</h3>
  </div>

	<div class="dyk" style="overflow: auto">
		<div class="message" style="position: relative;">
			<h2>Achieve technological enlightenment with Q-Blog</h2>
			<p style="font-size: 1.5em">Did you know that we have advanced a lot in tech? You can use our resources to know about these advancements.</p>
		</div>
		<img 
			src="/buddha.png" 
			style="
				max-width: 18%; 
				float: right;
			"
		>
	</div>

	<h1 style="text-align: center;">Articles</h1>
	
	<div class="filters">
		<div v-for="(filt, index) in filters" :key="filt">
			<button @click="() => { filter=filt.toLowerCase() }">{{ filt }}</button>
		</div>
	</div>
	<br>

	<div class="container">
		<input v-model="sFilter" class="search" @keyup.enter.prevent='() => { articleSearch(sFilter.toLowerCase()) }' placeholder="Seach for posts...">
  	<div v-if="loaded" class="articles">
    	<div v-for="item in articles" :key="item.title">
      	<div class="card">
        	<h2>
          	<RouterLink :to="'article' + '/' + item.title" class="title">{{ item.title }}</RouterLink>
        	</h2>
					<p class="summary">{{ item.summary }}</p>
      	</div>
    	</div>
  	</div>
	</div>
</template>

<style scoped>
.articles{
	position: relative;

}

h3, h2{
  color: var(--font-color); 
}

.title:hover{
	text-decoration: underline;
}

.summary{
	width: 70%;
	position: absolute;
	left: 50%;
	margin-left: -35%;
	text-align: justify;
}

.card{
  background-color: var(--card-bg-color);
  padding: 0.7em;
  margin-bottom: 1.3em;
  border: 1px solid var(--border-color);
  border-style: solid;
	height: 13.5em;
	text-align: center;
	width: 85%;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}

.banner{
  margin-bottom: 5vh;
	font-size: 1.6em;
  padding: 1.3rem;
	text-align: center;
}

.title, p{
	font-size: 1.3em;
}
input{
	background-color: var(--card-bg-color);
	color: var(--font-color);
	border: 1px solid var(--border-color);
	padding: 1em;
	margin-bottom: 1em;
	display: block;
  margin : 1.5em auto;
	width: 85%
}


button{
	margin-right: 0.5em;
	padding: 0.6em;
	border: none;
	background: #352C2C20;
	color: var(--font-color);
	cursor: pointer;
	transition: background 0.7s;
}

button:hover{
	background: #352C2C70;
}

.filters div{
	display: inline-block;
}

.dyk {
	width: 100%;
	height: 30%;
	border-top: 1px solid var(--border-color);
	border-bottom: 1px solid var(--border-color);
}

.dyk .message {
	border: 1px solid var(--border-color);
	margin: 1em;
	padding: 1.3em;
	text-align: center;
	width: 27em;
	font-size: 13px;
	margin-left: 40em;
	display: inline-block;
	background-color: var(--card-bg-color);
} 

.filters{
	display: inline;
	width: 70em;
	text-align: center;
	position: relative;
	left: 50%;
	margin-left: -20em;
}

.filters button{
	background: none;
	width: auto;
	font-family: "Inria Serif";
	color: var(--font-color);
}

.filters div:not(:first-child)::before {
	content: " | ";
	color: var(--border-color);
}

::-webkit-input-placeholder { 
	font-family: "Inria Serif";
	text-align: left;
	font-size: 15px;
	color: var(--font-color);
}

:-ms-input-placeholder { 
	font-family: "Inria Serif";
	text-align: left;
	font-size: 15px;
	color: var(--font-color);
}

::placeholder {
	font-family: "Inria Serif";
	text-align: left;
	font-size: 15px;
	color: var(--font-color);
}

@media ( max-width: 800px ) {
	.filters{
		display: none
	}
}

@media ( max-width: 1300px ) {
	.dyk{
		display: none;
	}
}
	
.container {
	position: absolute;
	width: 70%;
	left: 50%;
	margin-left: -35%;
	height: 100%;
	padding: 0;
}
</style>
