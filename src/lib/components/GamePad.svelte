<script>
	import { activeConfig } from '$lib/stores/stores';
	import GameControlls from '$lib/components/GameControlls.svelte';
	let gameControllsProp;

	const size = 300;

	$: r = size / 2 - $activeConfig.settings['Tile size'].selected / 2;
	$: deg =
		(180 - 360 / $activeConfig.tiles.length + $activeConfig.settings['Tile gap'].selected) / 2;
	$: x = r * Math.cos(rad(deg));
	$: y = r * Math.sin(rad(deg));

	const rad = (angle) => {
		return (angle * Math.PI) / 180;
	};

	let computerFinished;
</script>

<section>
	<svg viewBox="{-size / 2} {-size / 2} {size} {size}" xmlns="http://www.w3.org/2000/svg" class:unclickable={!computerFinished}>
		{#each $activeConfig.tiles as {color, isActivated}, index}
			<path
				d="M -{x} -{y} A {r} {r} 0 0 1 {x} -{y}"
				style:stroke={color}
				style:stroke-width={$activeConfig.settings['Tile size'].selected}
				style:transform="rotate({(360 / $activeConfig.tiles.length) * index}deg)"
				class:activated={isActivated}
				on:click={() => gameControllsProp.userClick(index)}
			/>
		{/each}
	</svg>

	<GameControlls bind:this={gameControllsProp} bind:computerFinished />
</section>

<style>
	section {
		max-block-size: 90vh;
		aspect-ratio: 1 / 1;
		position: relative;
		inset: 50% auto auto 50%;
		transform: translate(-50%, -50%);
	}

	svg {
		inline-size: 100%;
		block-size: 100%;
	}

	svg.unclickable {
		pointer-events: none;
	}

	path {
		fill: none;
	}

	path.activated {
		stroke: black !important;
	}
</style>
