<script>
	export let table;
	export let formatString;
	import { itemsPerPage } from '$lib/stores/stores';

	let currentPage = 1;

	$: getStartIndex = () => $itemsPerPage * (currentPage - 1);
	$: getEndIndex = () => currentPage * $itemsPerPage;

	$: pageAmount = Math.ceil(table.length / $itemsPerPage);
</script>

<p class="result-count">Found {table.length} results</p>

<ul class="table">
	{#each table.slice(getStartIndex(), getEndIndex()) as row}
		<li>
			<ul class="row">
				{#each Object.entries(row) as [column, value]}
					<li>{formatString(column)}: {value}</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<button on:click={() => --currentPage} disabled={currentPage === 1}>Previous</button>

<label>
	Page:
	<input type="number" bind:value={currentPage} min="1" max={pageAmount} />
</label>
<span>of {pageAmount}</span>

<button on:click={() => ++currentPage} disabled={currentPage === pageAmount}>Next</button>

<style>
	.table {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-block: 0.5rem;
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
