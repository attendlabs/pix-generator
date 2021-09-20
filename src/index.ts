import QRCode from 'qrcode';
import { merchant_account_info, format_info, get_additional_field, getCRC16 } from './helpers';
import {
	Config
} from './constants';

export default class PIX {

	static code = (tx_id: string, pix_key: string, amount: string, seller_name: string, seller_city: string): string | Error => {

		if (!tx_id || !pix_key || !amount || !seller_name) {
			throw new Error('Parameters required');
		}

		const merchant_account = merchant_account_info(pix_key, Config.MERCHANT_ACCOUNT, Config.MERCHANT_ACCOUNT_GUI, Config.MERCHANT_ACCOUNT_KEY, Config.MERCHANT_GUI_URL);
		const payload_indicator = format_info(Config.PAYLOAD_FORMAT_INDICATOR, '01');
		const country = format_info(Config.COUNTRY_CODE, 'BR');
		const merchant_category = format_info(Config.MERCHANT_CATEGORY_CODE, '0000');
		const translated_currency = format_info(Config.TRANSACTION_AMOUNT, amount);
		const merchant_name = format_info(Config.MERCHANT_NAME, seller_name);
		const merchant_city = format_info(Config.MERCHANT_CITY, seller_city);
		const additional_field = get_additional_field(Config.ADDITIONAL_DATA_FIELD_TEMPLATE, Config.ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, tx_id);

		const payload = `${payload_indicator}${merchant_account}${merchant_category}${translated_currency}${country}${merchant_name}${merchant_city}${additional_field}`;

		return `${payload}${getCRC16(CRC16, payload)}`;
	}

	static qrcode = async (code: string): Promise<string|Error> => {
		try {
			return await QRCode.toDataURL(code);
		} catch (err) {
			throw new Error('Erro ao gerar qrcode');
		}
	}

}