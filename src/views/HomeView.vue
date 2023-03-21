<script lang="ts" setup>
  import { supabase } from "../scripts/supabase"
  import { onMounted, ref, watch } from "vue"
  import { RouterLink } from "vue-router";

	// TODO: Reduce amt. of variables
  const loaded = ref(false);
  const articles = ref();
  const filter = ref();
	const found = ref(true);

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
																	.eq("title", title);

		if (!data) return;

    if (title.trim().length !== 0) {
			articles.value = data;
      loaded.value = true;  

			if (data.length == 0) return found.value = false;

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
  <div class="banner">
		<b><h1>Q-BLOG</h1></b>
    <h3>a nerd’s wonderland ( seriously. )</h3>
  </div>

	<h1 style="padding-left: 1.5rem">Recent</h1>


	<input v-model="filter" @keyup='() => { articleSearch(filter.toLowerCase()) }' placeholder="Post or filter">
  <select v-model="filter" class="filter">
    <option value="Dev">Dev</option>
    <option value="Test">Test</option>
  </select>

	<h1 v-if="!found">No articles found</h1>

  <div v-if="loaded" class="articles">
    <div v-for="item in articles" :key="item.title">
      <div class="card">
        <h2>
          <RouterLink :to="'article' + '/' + item.title.replaceAll(' ', '-')" class="title">{{ item.title }}</RouterLink>
        </h2>
				<p>{{ item.summary }}</p>
				<div class="tags" v-for="tag in item.tags" :key="tag">
					<button @click="filter = tag">{{ tag }}</button>
				</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

h3{
  color: white
}

.articles {
  color: #fff;
}

.title:hover{
	text-decoration: underline;
}

.card{
  background-color: #070707;
  padding: 0.7em;
  margin-bottom: 1.3em;
	/* margin-left: 40.4rem; */
	margin-left: 1.4em;
	margin-right: 40.4rem;
  border: 1px solid rgba(128, 128, 128, 0.171);
  border-style: solid;
	height: 13.5em;
	text-align: left;
	padding-left: 1.4rem;
}

.banner{
  margin-bottom: 5vh;
	font-size: 1.6em;
  /*background-color: rgb(241, 147, 40);*/
  border-radius: 0.5rem;
  /* border-image: linear-gradient(#b8205f, #4100aa) 30; */
  border-width: 2px;
  border-style: solid;
  padding: 1.3rem;
}

.title, p{
	font-size: 1.3em;
}

h2{
  color: rgb(241, 241, 241);
}

select{
  padding: 0.5rem;
	border-width: 1px;
  border-color: #352C2C40;
  margin-bottom: 5vh;
  background-color: #070707;
  color: white;
	width: 8%;
	padding: 0.7rem;
	margin-left: 1.5rem;
	font-family: Inria Serif;
}

input{
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

select:focus{
	border: 1px solid #dadada;
}

.tags{
	display: inline-block;
}

button{
	margin-right: 0.5em;
	padding: 0.6em;
	border: none;
	background: #352C2C20;
	color: #dadada;
	cursor: pointer;
	transition: background 0.7s;
}

button:hover{
	background: #352C2C70;
}
</style>
