<script>
	import {
		defaultTiles,
		defaultSettings,
		configs,
		selectedConfig,
		activeConfig
	} from '$lib/stores/stores';
	import RemoveButton from '$lib/components/RemoveButton.svelte';

	let newConfigName;
	const addConfig = () => {
		const nameIsDuplicate = $configs.findIndex((config) => config.name === newConfigName) !== -1;

		if (nameIsDuplicate) {
			alert('That config name already exists. Try another one.');
		} else {
			$configs = [
				...$configs,
				{
					name: newConfigName,
					tiles: JSON.parse(JSON.stringify(defaultTiles)),
					settings: JSON.parse(JSON.stringify(defaultSettings))
				}
			];
		}

		newConfigName = '';
	};

	const removeConfig = (i) => {
		$configs = $configs.filter((config, index) => i !== index);

		$selectedConfig = 'Default';
	};
</script>

<details open>
	<summary>Configs (<strong>{$activeConfig.name}</strong>)</summary>

	<form on:submit|preventDefault={addConfig}>
		<label>
			New config:
			<input type="text" bind:value={newConfigName} minlength="2" maxlength="20" required />
		</label>

		<button> Add config </button>
	</form>

	<ul>
		{#each $configs as config, i}
			{@const isDefault = config.name === 'Default'}

			<li class="action-item">
				<label>
					<input type="radio" name="configs" value={config.name} bind:group={$selectedConfig} />

					{config.name}
				</label>

				<RemoveButton on:click={() => removeConfig(i)} disabled={isDefault} />
			</li>
		{/each}
	</ul>
</details>
