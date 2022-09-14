<script>
	import { activeConfig, gameStarted } from '$lib/stores/stores';
	import { supabase } from '$lib/supabaseClient';
	export let computerFinished = false;

	let computerSequence = [];
	$: remainingClicks = computerSequence.length - userSequence.length;
	let reachedRounds = 0;
	let scoreSpeedMultiplier;
	let score = 0;
	let finalScore;
	let userSequence = [];
	let osc;

	const startGame = () => {
		$gameStarted = true;
		startRound();
	};

	const getGameSpeed = () => {
		switch ($activeConfig.settings.Speed.selected) {
			case 'Slow':
				scoreSpeedMultiplier = 1;
				return 800;
			case 'Medium':
				scoreSpeedMultiplier = 2;
				return 600;
			case 'Fast':
				scoreSpeedMultiplier = 3;
				return 400;
		}
	};

	const startRound = () => {
		let color = $activeConfig.tiles[Math.floor(Math.random() * $activeConfig.tiles.length)].color;
		let id = $activeConfig.tiles.findIndex((tile) => color === tile.color);

		computerSequence = [...computerSequence, id];

		computerSequence.forEach((entry, index) => {
			setTimeout(() => {
				activateTile(entry, getGameSpeed() / 2);
			}, ++index * getGameSpeed());
		});

		setTimeout(() => {
			computerFinished = true;
		}, computerSequence.length * getGameSpeed() + getGameSpeed());
	};

	const tileShortcuts = (event) => {
		if (computerFinished && $gameStarted) {
			switch (event.key) {
				case 'w':
					userClick(0);
					break;
				case 'a':
					userClick(3);
					break;
				case 's':
					userClick(2);
					break;
				case 'd':
					userClick(1);
					break;
			}
		}
	};

	const insertDBRow = async (name, score, speed, rounds_reached, tiles) => {
		const { data, error } = await supabase
			.from('leaderboard')
			.insert([{ name, score, speed, rounds_reached, tiles }]);
	};

	export const userClick = (i) => {
		userSequence = [...userSequence, i];
		const lastItem = userSequence.length - 1;

		activateTile(i, 100);

		if (computerSequence[lastItem] !== userSequence[lastItem]) {
			$gameStarted = false;
			computerSequence = [];
			computerFinished = false;
			finalScore = score;
			score = 0;
			userSequence = [];
			osc.stop();

			alert(`Game over!\nFinal score: ${finalScore}`);

			if (reachedRounds >= 5) {
				let name = '';

				while (name === '') {
					name = prompt(
						'Enter your name to add your score to the leaderboard: (Needs to be at least two characters long)'
					);
				}

				if (name)
					insertDBRow(
						name,
						finalScore,
						$activeConfig.settings.Speed.selected,
						reachedRounds,
						$activeConfig.tiles.length
					);
			}

			reachedRounds = 0;

			return;
		}

		if (computerSequence.length === userSequence.length) {
			++reachedRounds;
			score = scoreSpeedMultiplier * $activeConfig.tiles.length * reachedRounds;
			userSequence = [];
			computerFinished = false;

			setTimeout(() => startRound(), getGameSpeed());
		}
	};

	const activateTile = (id, timeout) => {
		$activeConfig.tiles[id].isActivated = true;
		if ($activeConfig.settings.Sound.selected) playSound(id);
		setTimeout(() => ($activeConfig.tiles[id].isActivated = false), timeout);
	};

	const playSound = (id) => {
		const ctx = new AudioContext();
		osc = ctx.createOscillator();
		const vol = ctx.createGain();

		osc.type = 'sine';
		osc.frequency.value = 220 + id * 20;
		vol.gain.value = 0.1;

		osc.connect(vol);
		vol.connect(ctx.destination);

		osc.start(0);
		setTimeout(() => osc.stop(), 100);
	};
</script>

<svelte:window on:keydown={tileShortcuts} />

<section>
	{#if $gameStarted}
		<p>Score</p>
		<h1>{score}</h1>
		<p>
			{@html computerFinished
				? `Your turn...<br>Clicks left: ${remainingClicks}`
				: 'Wait for the computer...'}
		</p>
	{:else}
		<button on:click={startGame}>Start</button>
	{/if}
</section>

<style>
	section {
		position: absolute;
		inset: 50% auto auto 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		user-select: none;
	}
</style>
