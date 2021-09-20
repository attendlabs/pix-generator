import { get_pad_length, getCRC16 } from '../src/helpers';
import { Config } from '../src/constants';


test('it should pad the string length with zero', () => {

	const pad = get_pad_length('123456789', 2);
	expect(pad).toBe('09');

	const bigger_pad = get_pad_length('00000000000123456789', 2);
	expect(bigger_pad).toBe('20');

});

test('it should get CRC16 correctly', () => {

	const result = getCRC16(Config.CRC16, '12345');
	expect(result).toBe('6304AD75');

	const result2 = getCRC16(Config.CRC16, '101010');
	expect(result2).toBe('6304D62');
});