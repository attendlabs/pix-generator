import QRCode from 'qrcode';

export const generateQR = async (text: string): Promise<string> => {
	try {
		return await QRCode.toDataURL(text);
	} catch (err) {
		throw new Error('Erro ao gerar qrcode');
	}
};

( async() => {
	console.log(await generateQR('teste'));
})();