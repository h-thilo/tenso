<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
</script>

<header>
	<h3>Tenso</h3>
	<button>Setup</button>

	<Nav />
</header>

<main>
	<slot />
</main>

<style>
	header {
		block-size: var(--header-height);
		display: flex;
		align-items: center;
		border: 1px solid var(--border-color-100);
	}

	main {
		block-size: var(--main-height);
	}
</style>
