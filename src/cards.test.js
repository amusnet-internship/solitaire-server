import { jest, expect, test, describe, beforeEach } from '@jest/globals';
import { Card, Stack, stacks, faces, suits } from './cards.js';


describe('Foundation', () => {
    /** @type {Stack} */
    let stack = null;

    const sameSuit = suits.Spades;
    const otherSuit = suits.Clubs;

    beforeEach(() => {
        stack = new Stack(stacks.Foundation, sameSuit);
    });

    describe('Empty', () => {

        test('cannot flip', () => {
            expect(stack.canFlip()).toBeFalsy();
        });

        test('cannot take', () => {
            expect(stack.canTake(0)).toBeFalsy();
        });

        test('cannot place greater than Ace of same suit', () => {
            const card = new Card(faces.Two, sameSuit);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('cannot place greater than Ace of another suit', () => {
            const card = new Card(faces.Two, otherSuit);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('cannot place Ace of another suit', () => {
            const card = new Card(faces.Ace, otherSuit);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('can place Ace of same suit', () => {
            const card = new Card(faces.Ace, sameSuit);
            expect(stack.canPlace(card)).toBeTruthy();
        });
    });

    describe('Two cards on stack', () => {
        beforeEach(() => {
            stack.cards.push(new Card(faces.Ace, sameSuit, true));
            stack.cards.push(new Card(faces.Two, sameSuit, true));
        });

        test('cannot flip', () => {
            expect(stack.canFlip()).toBeFalsy();
        });

        test('cannot take bottom', () => {
            expect(stack.canTake(0)).toBeFalsy();
        });

        test('cannot take greater than top', () => {
            expect(stack.canTake(2)).toBeFalsy();
        });

        test('can take top', () => {
            expect(stack.canTake(1)).toBeTruthy();
        });

        test('cannot place smaller than top', () => {
            const card = new Card(faces.Ace, sameSuit, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('cannot place same as top', () => {
            const card = new Card(faces.Two, sameSuit, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('cannot place two-greater than top', () => {
            const card = new Card(faces.Four, sameSuit, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('cannot place another suit', () => {
            const card = new Card(faces.Three, otherSuit, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('can place one-greater than top', () => {
            const card = new Card(faces.Three, sameSuit, true);
            expect(stack.canPlace(card)).toBeTruthy();
        });
    });

});

describe('Waste', () => {
    /** @type {Stack} */
    let stack = null;

    beforeEach(() => {
        stack = new Stack(stacks.Waste);
    });

    describe('Empty', () => {
        
        test('cannot flip', () => {
            expect(stack.canFlip()).toBeFalsy();
        });

        test('cannot take', () => {
            expect(stack.canTake(0)).toBeFalsy();
        });

        test('cannot place anything', () => {
            let card = new Card(faces.Ace, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();

            card = new Card(faces.Two, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();

            card = new Card(faces.King, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });
    });

    describe('Two cards on stack', () => {
        beforeEach(() => {
            stack.cards.push(new Card(faces.Jack, suits.Clubs, true));
            stack.cards.push(new Card(faces.Four, suits.Diamonds, true));
        });

        test('cannot flip', () => {
            expect(stack.canFlip()).toBeFalsy();
        });

        test('cannot take bottom', () => {
            expect(stack.canTake(0)).toBeFalsy();
        });

        test('cannot take greater than top', () => {
            expect(stack.canTake(2)).toBeFalsy();
        });

        test('can take top', () => {
            expect(stack.canTake(1)).toBeTruthy();
        });

        test('cannot place anything', () => {
            let card = new Card(faces.Ace, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();

            card = new Card(faces.Two, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();

            card = new Card(faces.King, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });
    });
});

describe('Stock', () => {
    /** @type {Stack} */
    let stack = null;

    beforeEach(() => {
        stack = new Stack(stacks.Stock);
    });

    describe('Empty', () => {

        test('can flip (recycle waste)', () => {
            expect(stack.canFlip()).toBeTruthy();
        });

        test('cannot take', () => {
            expect(stack.canTake(0)).toBeFalsy();
        });

        test('cannot place anything', () => {
            let card = new Card(faces.Ace, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();

            card = new Card(faces.Two, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();

            card = new Card(faces.King, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });
    });

    describe('Two cards on stack', () => {
        beforeEach(() => {
            stack.cards.push(new Card(faces.Jack, suits.Clubs, false));
            stack.cards.push(new Card(faces.Four, suits.Diamonds, false));
        });

        test('can flip', () => {
            expect(stack.canFlip()).toBeTruthy();
        });

        test('cannot take anything', () => {
            expect(stack.canTake(0)).toBeFalsy();
            expect(stack.canTake(1)).toBeFalsy();
            expect(stack.canTake(2)).toBeFalsy();
        });

        test('cannot place anything', () => {
            let card = new Card(faces.Ace, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();

            card = new Card(faces.Two, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();

            card = new Card(faces.King, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });
    });
});

describe('Pile', () => {
    /** @type {Stack} */
    let stack = null;

    beforeEach(() => {
        stack = new Stack(stacks.Pile);
    });

    describe('Empty', () => {

        test('cannot flip', () => {
            expect(stack.canFlip()).toBeFalsy();
        });

        test('cannot take', () => {
            expect(stack.canTake(0)).toBeFalsy();
        });

        test('cannot place less than King', () => {
            const card = new Card(faces.Two, suits.Clubs);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('can place King', () => {
            const card = new Card(faces.King, suits.Clubs);
            expect(stack.canPlace(card)).toBeTruthy();
        });
    });

    describe('Two face-down cards on stack', () => {
        beforeEach(() => {
            stack.cards.push(new Card(faces.Jack, suits.Clubs, false));
            stack.cards.push(new Card(faces.Four, suits.Diamonds, false));
        });

        test('can flip', () => {
            expect(stack.canFlip()).toBeTruthy();
        });

        test('cannot take anything', () => {
            expect(stack.canTake(0)).toBeFalsy();
            expect(stack.canTake(1)).toBeFalsy();
            expect(stack.canTake(2)).toBeFalsy();
        });

        test('cannot place anything', () => {
            let card = new Card(faces.Ace, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();

            card = new Card(faces.Two, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();

            card = new Card(faces.King, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });
    });

    describe('One face-down and one face-up', () => {
        beforeEach(() => {
            stack.cards.push(new Card(faces.Jack, suits.Clubs, false));
            stack.cards.push(new Card(faces.Four, suits.Diamonds, true));
        });

        test('cannot flip', () => {
            expect(stack.canFlip()).toBeFalsy();
        });

        test('cannot take bottom', () => {
            expect(stack.canTake(0)).toBeFalsy();
        });

        test('cannot take greater than top', () => {
            expect(stack.canTake(2)).toBeFalsy();
        });

        test('can take top', () => {
            expect(stack.canTake(1)).toBeTruthy();
        });

        test('cannot place two-less than top', () => {
            const card = new Card(faces.Two, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('cannot place same as top', () => {
            const card = new Card(faces.Four, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('cannot place greater than top', () => {
            const card = new Card(faces.Five, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });

        test('cannot place wrong suit', () => {
            const card = new Card(faces.Three, suits.Hearts, true);
            expect(stack.canPlace(card)).toBeFalsy();
        });
        
        test('can place one-less than top', () => {
            const card = new Card(faces.Three, suits.Clubs, true);
            expect(stack.canPlace(card)).toBeTruthy();
        });
    });
});