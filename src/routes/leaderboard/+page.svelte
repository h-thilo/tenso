<script>
	import { supabase } from '$lib/supabaseClient';
	import Table from '$lib/components/Table.svelte';
	import { itemsPerPage } from '$lib/stores/stores';

	let filterByName;
	let sortBy = 'score';

	$: getLeaderboardTable = async (nameFilter, sortBy) => {
		let query = supabase
			.from('leaderboard')
			.select('created_at,name,score,speed,rounds_reached,tiles');

		if (sortBy) {
			query = query.order(sortBy, {
				ascending:
					sortBy === 'score' || sortBy === 'rounds_reached' || sortBy === 'tiles' ? false : true
			});
		}

		query = query.order('score', { ascending: false });

		if (nameFilter) {
			query = query.ilike('name', `%${nameFilter}%`);
		}

		const { data, error } = await query;

		return data;
	};

	const sortCategories = ['created_at', 'name', 'score', 'speed', 'rounds_reached', 'tiles'];

	const formatString = (str) => {
		return (str[0].toUpperCase() + str.slice(1)).replace('_', ' ');
	};
</script>

<div class="container">
	<h1>Leaderboard</h1>

	<section class="arrange">
		<label>
			Search by name:
			<input type="search" bind:value={filterByName} />
		</label>

		<label>
			Sort:
			<select name="sort-leaderboard" id="sort-leaderboard" bind:value={sortBy}>
				{#each sortCategories as category}
					<option value={category}>{formatString(category)}</option>
				{/each}
			</select>
		</label>

		<label>
			Items per page:
			<input type="number" bind:value={$itemsPerPage} min="1" />
		</label>
	</section>

	<section>
		{#await getLeaderboardTable(filterByName, sortBy)}
			<p>Fetching data...</p>
		{:then table}
			{#if table.length === 0}
				<p>No results found</p>
			{:else}
				<Table {table} {formatString} />
			{/if}
		{:catch error}
			<p>An error occured ({error})</p>
		{/await}
	</section>
</div>

<style>
	.container {
		max-inline-size: 1140px;
		margin-inline: auto;
		padding: 1rem;
	}

	.arrange {
		margin-block: 0.5rem;
		display: flex;
		gap: 0.5rem 1rem;
		flex-wrap: wrap;
	}
</style>
