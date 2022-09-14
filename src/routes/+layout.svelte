<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import { selectedTheme, showSidebar } from '$lib/stores/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<header>
	<h3>Tenso</h3>
	<button on:click={() => ($showSidebar = !$showSidebar)}>Setup</button>

	<Nav />
</header>

<svelte:head>
	<meta name="color-scheme" content={$selectedTheme == 'System' ? 'light dark' : $selectedTheme} />
	<link rel="stylesheet" href={`/theme/${$selectedTheme.toLowerCase()}.css`} />
</svelte:head>

<main>
	<Sidebar />

	<slot />
</main>

<style>
	header {
		block-size: var(--header-height);
		display: flex;
		align-items: center;
		border: 1px solid var(--border-color-100);
		background-color: var(--color-200);
		padding-inline: 1rem;
	}

	button {
		margin-inline-start: 0.5rem;
	}

	main {
		block-size: var(--main-height);
		background-color: var(--color-100);
	}
</style>
