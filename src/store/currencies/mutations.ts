import { MutationTree } from 'vuex'

import { State } from './state'

import { TCurrency } from '@/types'

export enum CurrenciesMutationTypes {
    UPDATE_CURRENCIES = 'UPDATE_CURRENCIES',
    CHANGE_DEFAULT_CURRENCY = 'CHANGE_DEFAULT_CURRENCY'
}

export type Mutations<S = State> = {
    [CurrenciesMutationTypes.UPDATE_CURRENCIES](state: S, payload: TCurrency[] ) :void,
    [CurrenciesMutationTypes.CHANGE_DEFAULT_CURRENCY](state: S, payload: TCurrency ) :void,
}

export const mutations: MutationTree<State> & Mutations = {
    [CurrenciesMutationTypes.UPDATE_CURRENCIES](state: State, currencies: TCurrency[]) {
        state.currencies = currencies
        localStorage.setItem('currencies', JSON.stringify(state.currencies))
    },
    [CurrenciesMutationTypes.CHANGE_DEFAULT_CURRENCY](state: State, currency: TCurrency) {
        state.defaultCurrency = currency
        localStorage.setItem('default-currency', JSON.stringify(state.defaultCurrency))
    },
}
