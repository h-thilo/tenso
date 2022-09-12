<script>
	import { activeConfig } from '$lib/stores/stores';
</script>

<details>
	<summary>Settings</summary>

	<ul>
		{#each Object.entries($activeConfig.settings) as [setting, value]}
			<li>
				<label>
					{setting}:

					{#if typeof value.selected === 'boolean'}
						<input type="checkbox" bind:checked={$activeConfig.settings[setting].selected} />
					{:else}
						<select bind:value={$activeConfig.settings[setting].selected}>
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
