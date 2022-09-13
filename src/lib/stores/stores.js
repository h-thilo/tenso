import { writable } from 'svelte-local-storage-store';
import { derived, get } from 'svelte/store';

export class Tile {
	constructor(color) {
		this.color = color;
		this.isActivated = false;
	}
}

class Setting {
	constructor(options, selected) {
		this.options = options;
		this.selected = selected;
	}
}

export const defaultTiles = [
	new Tile('#ef4444'),
	new Tile('#3b82f6'),
	new Tile('#eab308'),
	new Tile('#22c55e')
];

export let showSidebar = writable('showSidebar', false);

export let selectedTheme = writable('selectedTheme', 'System');

export const defaultSettings = {
	Sound: new Setting([true, false], true),
	Speed: new Setting(['Slow', 'Medium', 'Fast'], 'Slow'),
	'Tile size': new Setting([20, 80], 40),
	'Tile gap': new Setting([0, 20], 10)
};

export let configs = writable('configs', [
	{
		name: 'Default',
		tiles: JSON.parse(JSON.stringify(defaultTiles)),
		settings: JSON.parse(JSON.stringify(defaultSettings))
	}
]);

export let selectedConfig = writable('selectedConfig', 'Default');

const activeConfigStore = () => {
	const { subscribe } = derived([configs, selectedConfig], ([$configs, $selectedConfig]) => {
		const itemIndex = $configs.findIndex((config) => config.name === $selectedConfig);
		return $configs[itemIndex];
	});
	return {
		subscribe,
		set(value) {
			configs.update((cfgs) => {
				cfgs[cfgs.findIndex((cfg) => cfg.name === get(selectedConfig))] = value;
				return cfgs;
			});
		}
	};
};
export let activeConfig = activeConfigStore();
