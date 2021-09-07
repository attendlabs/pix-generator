import teste from '../src/index';

test('it should return teste', () => {
	const text = teste();

	expect(text).toBe('teste');
});