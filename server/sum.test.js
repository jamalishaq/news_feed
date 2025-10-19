import { sum } from './sum.js';

test("adds 2 + 3 equals ", () => {
    expect(sum(2, 3)).toBe(5);
})