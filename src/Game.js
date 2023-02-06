import { Player } from './Player.js';


export class Game {
    /** @type {Player} */
    player = null;
    state = null;

    /**
     * 
     * @param {Player} player 
     */
    addPlayer(player) {
        this.player = player;

        this.player.onNewGame = this.newGame.bind(this);
        
        // if game is ongoing, send current state, else make a new state
        if (this.state == null) {
            this.newGame();
        }
        this.player.setGameState(this.state);
    }

    newGame() {
        // TODO: initialize decks
        console.log('new game');

        // shuffle deck
        // deal cards to make piles
        // move remaining deck to the stock
    }
}