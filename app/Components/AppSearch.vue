<script setup lang="ts">
import {GamePickerUI} from '~/Controllers/GamePickerUI'

const UI = new GamePickerUI();
</script>

<template>
	<form @submit.prevent>
		<input
			v-model="input"
			type="text"
			placeholder="Enter your Steam ID or profile URL"
			autocomplete="off"
			spellcheck="false"
		/>
		<button
			type="submit"
			@click="UI.searchUser(input)"
			>
			Search
		</button>
	</form>
</template>

<style scoped>

</style>