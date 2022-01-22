import { TCurrency } from '@/types'

export type State = {
    currencies: TCurrency[];
    defaultCurrency: TCurrency
}

export const state: State = {
    currencies: ['USD', 'EUR', 'CZK', 'JPN'],
    defaultCurrency: 'EUR',
}
