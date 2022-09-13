<script>
	import Configs from '$lib/components/Configs.svelte';
	import Tiles from '$lib/components/Tiles.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import { selectedTheme, showSidebar } from '$lib/stores/stores';

	const themes = ['System', 'Light', 'Dark'];
</script>

{#if $showSidebar}
	<aside>
		<label>
			Theme:
			<select name="theme" id="theme" bind:value={$selectedTheme}>
				{#each themes as theme}
					<option value={theme}>{theme}</option>
				{/each}
			</select>
		</label>

		<Configs />
		<Tiles />
		<Settings />
	</aside>
{/if}

<style>
	aside {
		inline-size: 200px;
		block-size: 100%;
		border-inline-end: 1px solid var(--border-color-100);
		position: fixed;
		z-index: 10;
		background-color: var(--color-200);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow-y: auto;
	}
</style>
