export const getCRC16 = (crc16: string, payload: string): string => {
	payload += `${crc16}04`;

	const polinomio = 0x1021;
	let result = 0xFFFF;

	const flag = payload.length;

	if ((flag) > 0) {
		for (let offset = 0; offset < flag; offset++) {
			result ^= (payload[offset].charCodeAt(0) << 8);
			for (let bitwise = 0; bitwise < 8; bitwise++) {
				if ((result <<= 1) & 0x10000) result ^= polinomio;
				result &= 0xFFFF;
			}
		}
	}
	return `${crc16}04${result.toString(16).toUpperCase()}`;
};


export const merchant_account_info = (pix_key: string, merchant_account_info: string, merchant_gui: string, merchant_key: string, merchant_gui_url: string): string => {

	const result = `${merchant_gui}${merchant_gui_url.length}${merchant_gui_url}${merchant_key}${pix_key.length}${pix_key}`;
	return `${merchant_account_info}${result.length}${result}`;
};

export const format_info = (id: string, value: string): string => {
	const size = get_pad_length(value, 2);
	return `${id}${size}${value}`;
};

export const get_pad_length = (input: string, size: number): string => {
	const result = input.length.toString();
	return result.padStart(size, '0');
};

export const get_additional_field = (id_additional_field: string, id_tx_id: string, value: string): string => {
	const tx_id_size = get_pad_length(value, 2);
	const additional_size = get_pad_length(`${id_tx_id}${tx_id_size}${value}`, 2);

	return `${id_additional_field}${additional_size}${id_tx_id}${tx_id_size}${value}`;
};


