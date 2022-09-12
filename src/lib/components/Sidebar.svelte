<script>
	import Configs from '$lib/components/Configs.svelte';
	import Tiles from '$lib/components/Tiles.svelte';
	import Settings from '$lib/components/Settings.svelte';
</script>

<aside>
	<Configs />
	<Tiles />
	<Settings />
</aside>

<style>
	aside {
		inline-size: 200px;
		block-size: 100%;
		border-inline-end: 1px solid var(--border-color-100);
		position: fixed;
		z-index: 10;
		background-color: var(--color-100);
	}
</style>
