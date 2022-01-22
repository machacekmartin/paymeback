import { MutationTree } from 'vuex'

import { State } from './state'

import { TCurrency } from '@/types'

export enum CurrenciesMutationTypes {
    ADD_CURRENCY = 'ADD_CURRENCY',
}

export type Mutations<S = State> = {
    [CurrenciesMutationTypes.ADD_CURRENCY](state: S, payload: TCurrency ) :void,
}

export const mutations: MutationTree<State> & Mutations = {
    [CurrenciesMutationTypes.ADD_CURRENCY](state: State, currency: TCurrency) {
        state.currencies.push(currency)
    },
}
