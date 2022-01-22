import { GetterTree } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'

import { TCurrency } from '@/types'

export type Getters = {
    currencies(state: State): TCurrency[]
    defaultCurrency(state: State): TCurrency,
    currenciesObject(state: State): Array<object>
}

export const getters : GetterTree<State, RootState> & Getters = {
    currencies: (state) => state.currencies,
    defaultCurrency: (state) => state.defaultCurrency,
    currenciesObject: (state): Array<object> => {
        return state.currencies.map((currency): object => {
            return {
                value: currency
            }
        })
    }
}