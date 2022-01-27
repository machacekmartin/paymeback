import { MutationTree } from 'vuex'

import { State } from './state'

import { TDebtor } from '@/types'

export enum DebtorsMutationTypes {
    ADD_DEBTOR = 'ADD_DEBTOR',
}

export type Mutations<S = State> = {
    [DebtorsMutationTypes.ADD_DEBTOR](state: S, payload: TDebtor ) :void,
}

export const mutations: MutationTree<State> & Mutations = {
    [DebtorsMutationTypes.ADD_DEBTOR](state: State, debtor: TDebtor) {
        state.debtors.push(debtor)
        localStorage.setItem('debtors', JSON.stringify(state.debtors))
    },
}
