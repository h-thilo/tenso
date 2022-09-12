<script>
    import { activeConfig } from '$lib/stores/stores';
    export let computerFinished = false;

    let gameStarted = false;
    let computerSequence = [];
    $: remainingClicks = computerSequence.length - userSequence.length;
    let score = 0;
    let userSequence = [];

    const startGame = () => {
        gameStarted = true;
        startRound();
    }

    const startRound = () => {
        let color = $activeConfig.tiles[Math.floor(Math.random() * $activeConfig.tiles.length)].color;
        let id = $activeConfig.tiles.findIndex(tile => color === tile.color);

        computerSequence = [...computerSequence, id];

        computerSequence.forEach((entry, index) => {
            setTimeout(() => {
                activateTile(entry, $activeConfig.settings.Speed.selected / 2);
            }, ++index * $activeConfig.settings.Speed.selected)
        })

        setTimeout(() => {
            computerFinished = true;
        }, computerSequence.length * $activeConfig.settings.Speed.selected + $activeConfig.settings.Speed.selected);
    }

    export const userClick = (i) => {
        userSequence = [...userSequence, i];
        const lastItem = userSequence.length - 1;

        activateTile(i, 100);

        if (computerSequence[lastItem] !== userSequence[lastItem]) {
            gameStarted = false;
            computerSequence = [];
            computerFinished = false;
            score = 0;
            userSequence = [];

            alert('Game over!');

            return;
        }

        if (computerSequence.length === userSequence.length) {
            ++score;
            userSequence = [];
            computerFinished = false;
            
            setTimeout(() => startRound(), $activeConfig.settings.Speed.selected);
        }
    }

    const activateTile = (id, timeout) => {
        $activeConfig.tiles[id].isActivated = true;
        setTimeout(() => $activeConfig.tiles[id].isActivated = false, timeout);
    }
</script>

<section>
    {#if gameStarted}
        <h1>Score: {score}</h1>
        <p>{@html computerFinished ? `Your turn...<br>Clicks left: ${remainingClicks}` : 'Wait for the computer...'}</p>
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