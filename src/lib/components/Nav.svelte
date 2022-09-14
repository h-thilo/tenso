<script>
	import { page } from '$app/stores';

	const links = [
		{ route: '/', name: 'Play' },
		{ route: '/leaderboard', name: 'Leaderboard' }
	];
</script>

<nav>
	<ul>
		{#each links as { route, name }}
			<li>
				<a href={route} class:activated={$page.url.pathname === route}>{name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		margin-inline-start: auto;
	}

	ul {
		display: flex;
		gap: 0.5rem;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	.activated {
		text-decoration: underline;
	}
</style>
