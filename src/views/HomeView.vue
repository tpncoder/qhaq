<script lang="ts" setup>
  import { supabase } from "@/scripts/supabase"
  import { onMounted, ref, watch } from "vue"
  import { RouterLink } from "vue-router";

  const loaded = ref(false);
  const articles = ref();
  const filter = ref();

  watch(filter, async (currentFilter, oldFilter) => {
    console.log(currentFilter); //logs current filter
    if (currentFilter.toLowerCase() !== "none"){
      const { data, error } = await supabase.from("articles").select().eq("filter", currentFilter.toLowerCase());
      if (data) {
        articles.value = data;
        loaded.value = true;  
      } else {
        console.log(error);
      }
    }
  })

  onMounted(async () => {
    const { data, error } = await supabase.from("articles").select();
    if (data) {
      articles.value = data;
      loaded.value = true;  
    } else {
      console.log(error);
    }
  })
</script>

<template>
  <div class="banner">
    <h1>Q-Blog</h1>
    <h3>The wikipedia for techs</h3>
  </div>

  <h3>Filter by:</h3>
  <select v-model="filter" class="filter">
    <option>Dev</option>
    <option>Test</option>
  </select>

  <transition name="fade" appear>
    <div v-if="loaded" class="articles">
      <!--article div-->
      <!--TODO: implement filtering-->
      <div v-for="(item, index) in articles">
        <div class="card">
          <h2>
            <RouterLink :to="'article' + '/' + item.title">{{ item.title }}</RouterLink>
          </h2>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>

h3{
  color: white
}

.articles {
  color: #fff;
  text-align: center;
}

.card{
  background-color: rgb(15, 15, 15);
  padding: 0.7em;
  border-radius: 0.5rem;
  margin-bottom: 1.3em;
  border: 1px solid rgba(128, 128, 128, 0.171);
  border-style: solid;
}

.banner{
  margin-bottom: 5vh;
  text-align: center;
  font-size: 1.6em;
  /*background-color: rgb(241, 147, 40);*/
  border-radius: 0.5rem;
  border-image: linear-gradient(#b8205f, #4100aa) 30;
  border-width: 2px;
  border-style: solid;
  padding: 1.3rem;
}

h2{
  color: rgb(241, 241, 241);
  text-align: center;
}

select{
  padding: 0.5rem;
  border: 1px solid rgba(128, 128, 128, 0.171);
  margin-bottom: 5vh;
  background-color: rgb(15, 15, 15);
  color: white;
  border-radius: 0.5rem;
}
</style>