<script setup lang="ts">
import {GamePickerUI} from '~/Controllers/GamePickerUI'

const UI = new GamePickerUI();
</script>

<template>
	<div class="user">
		<img :src="UI.user.avatar" alt="User Avatar" />
		<div class="info">
			<h2>{{ UI.user.name }}</h2>
			<p v-if="UI.user.id">Steam ID: {{ UI.user.id }}</p>
		</div>
	</div>
	<input
		v-model="query"
		@input="UI.searchUser(query)"
		type="text"
		placeholder="Enter your Steam ID or profile URL"
		autocomplete="off"
		spellcheck="false"
	/>
</template>

<style scoped>

</style>