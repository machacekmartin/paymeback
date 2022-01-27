import { TCurrency } from '@/types'

export type State = {
    currencies: TCurrency[],
    availableCurrencies: TCurrency[],
    defaultCurrency: TCurrency
}

export const state: State = {
    currencies: JSON.parse(localStorage.getItem('currencies') as string)  || ['CZK', 'EUR'],
    availableCurrencies: ['CZK', 'EUR', 'USD', 'JPY', 'AUD', 'CAD', 'PLN', 'GBP'],
    defaultCurrency: JSON.parse(localStorage.getItem('default-currency') as string) || 'AUD',
}
