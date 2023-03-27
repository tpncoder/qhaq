import { defineStore } from "pinia";
import { ref } from "vue"

export const useThemeStore = defineStore('theme', () => {
	const darkTheme = ref(false);

	function toggle() {
		darkTheme.value = !darkTheme.value;
	}

	return { darkTheme, toggle }
})
