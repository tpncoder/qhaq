<template>
  <p v-if="loading">{{ articleData[0].content }}</p>
</template>

<script setup lang="ts">
  import { supabase } from "@/scripts/supabase"
  import { onMounted, ref } from "vue"
  import { useRoute } from 'vue-router';

  const route = useRoute()
  const articleData = ref();
  const loading = ref(false);

  onMounted(async () => {
    const { data, error } = await supabase.from("articles").select().eq("title", route.path.slice(9))
    if (data) {
      console.log(data);
      articleData.value = data;
      loading.value = true;
    } else {
      console.log(error)
    }
  })
</script>