<script lang="ts" setup>
  import { supabase } from "@/scripts/supabase"
  import { onMounted, ref } from "vue"
  import { RouterLink } from "vue-router";

  const loaded = ref(false);
  const articles = ref();

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
    <h1>Home of all tech enthusiasts</h1>
  </div>

  <h2>Recent Articles</h2>

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
</template>

<style scoped>
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
}

.banner{
  margin-bottom: 5vh;
  text-align: center;
  font-size: 1.6em;
}

h2{
  color: rgb(241, 241, 241);
  text-align: center;
}
</style>