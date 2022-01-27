import { GetterTree } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'

import { TCurrency } from '@/types'

export type Getters = {
    currencies(state: State): TCurrency[],
    availableCurrencies(state: State): TCurrency[],

    defaultCurrency(state: State): TCurrency,
}

export const getters : GetterTree<State, RootState> & Getters = {
    currencies: (state) => state.currencies,
    availableCurrencies: (state) => state.availableCurrencies,

    defaultCurrency: (state) => state.defaultCurrency,
}