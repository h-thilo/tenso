<script>
	import { activeConfig, gameStarted } from '$lib/stores/stores';
</script>

<details open>
	<summary>Settings</summary>

	<ul>
		{#each Object.entries($activeConfig.settings) as [setting, value]}
			{@const rangeMin = value.options[0]}
			{@const rangeMax = value.options[1]}

			<li>
				<label>
					{setting}:

					{#if typeof value.selected === 'boolean'}
						<input type="checkbox" bind:checked={$activeConfig.settings[setting].selected} />
					{:else if typeof value.selected === 'number'}
						<input
							type="range"
							min={rangeMin}
							max={rangeMax}
							bind:value={$activeConfig.settings[setting].selected}
						/>
					{:else}
						<select
							name={setting}
							id={setting}
							bind:value={$activeConfig.settings[setting].selected}
							disabled={setting === 'Speed' && $gameStarted}
						>
							{#each value.options as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					{/if}
				</label>
			</li>
		{/each}
	</ul>
</details>
