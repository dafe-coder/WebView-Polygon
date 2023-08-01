export const setLabelCurrency = (priceConvert, currency) => {
    let t = ''
    if (priceConvert != 1) {
        switch (currency.toUpperCase()) {
            case 'CNY':
                t = '¥'
                break
            case 'EUR':
                t = '€'
                break
            case 'CAD':
                t = '$'
                break
            case 'RUB':
                t = '₽'
                break
            case 'JPY':
                t = '¥'
                break
            case 'PLN':
                t = 'Zł'
                break
            default:
                t = '$'
                break
        }
        return t
    } else {
        return (t = '$')
    }
}