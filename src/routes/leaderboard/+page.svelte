<script>
	import { supabase } from '$lib/supabaseClient';

	const getLeaderboardTable = async () => {
		const { data: leaderboard, error } = await supabase
			.from('leaderboard')
			.select('created_at,name,score,speed,rounds_reached,tiles');

		return leaderboard;
	};
</script>

<div class="container">
	{#await getLeaderboardTable()}
		<p>Fetching data...</p>
	{:then table}
		<ul class="table">
			{#each table as row}
				<li>
					<ul class="row">
						{#each Object.entries(row) as [column, value]}
							<li>{column}: {value}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{:catch error}
		<p>An error occured ({error})</p>
	{/await}
</div>

<style>
	.container {
		max-inline-size: 1140px;
		margin-inline: auto;
		padding: 1rem;
	}

	.table {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.row {
		border: 1px solid var(--border-color-100);
		border-radius: 0.25rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 0.5rem 1rem;
		background-color: var(--color-200);
		padding: 0.5rem 1rem;
	}
</style>
