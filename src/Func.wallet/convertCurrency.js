export default function convertCurrency(to, amount) {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '858e123930msh2cf167f2a15665ep164d8ajsnb1e687303080',
			'X-RapidAPI-Host': 'fixer-fixer-currency-v1.p.rapidapi.com',
		},
	}

	fetch(
		`https://fixer-fixer-currency-v1.p.rapidapi.com/convert?from=USD&to=${to}&amount=${amount}`,
		options
	)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err))
}
