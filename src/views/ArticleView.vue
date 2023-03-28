<template>
  <nav>
    <button>
      <RouterLink to="/">back</RouterLink>
    </button>
  </nav>
  <transition name="fade" appear>
    <div>
      <h1 v-if="loading">{{ articleData[0].title }}</h1>
      <h3 v-if="loading" style="color: white; text-align: center">{{ articleData[0].created_at.slice(0, -22) }}</h3>
      <p v-if="loading" v-html="articleData[0].content"></p>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { supabase } from "../scripts/supabase"
  import { onMounted, ref } from "vue"
  import { useRoute , RouterLink} from 'vue-router';

  const route = useRoute()
  const articleData = ref();
  const loading = ref(false);
	const html = ref();

  onMounted(async () => {
    const { data, error } = await supabase
																		.from("articles")
																		.select()
																		.eq("title", route.path.slice(9))


    if (data) {
      console.log(data);
      articleData.value = data;
      loading.value = true;
    } else {
      console.log(error)
    }
  })
</script>

<style scoped>
  h1{
    font-size: 40px;
    width: 100%;
    text-align: center;
  }

  p{
    font-size: 25px;
    width:70%;
    line-height: 2;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  button{
    background-color: transparent;
    border: none;
  }

	img{
		width: 30%;
		height: 30%;
	}

</style>
