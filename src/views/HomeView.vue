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
  <div v-if="loaded">
    <div v-for="(item, index) in articles">
      <div class="card">
        <h1>
          <RouterLink :to="'article' + '/' + item.title">{{ item.title }}</RouterLink>
        </h1>
      </div>
    </div>
  </div>
</template>