<script>
	import { activeConfig, Tile, gameStarted } from '$lib/stores/stores';
	import RemoveButton from '$lib/components/RemoveButton.svelte';

	const genRanHex = (size) => {
		return '#' + [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
	};

	const addTile = () => {
		$activeConfig.tiles = [...$activeConfig.tiles, new Tile(genRanHex(6))];
	};

	const removeTile = (i) => {
		$activeConfig.tiles = $activeConfig.tiles.filter((tile, index) => i !== index);
	};
</script>

<details open>
	<summary>Tiles</summary>

	<button on:click={addTile} disabled={$activeConfig.tiles.length >= 16 || $gameStarted}
		>Add tile</button
	>
	<ul>
		{#each $activeConfig.tiles as tile, i}
			<li class="action-item">
				<input type="color" bind:value={tile.color} />

				<RemoveButton on:click={() => removeTile(i)} disabled={i <= 3} />
			</li>
		{/each}
	</ul>
</details>
