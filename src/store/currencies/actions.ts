import { ActionTree, ActionContext } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'
import { Mutations, CurrenciesMutationTypes } from './mutations';

import { TCurrency } from '@/types'

export enum CurrenciesActionTypes {
    ADD_CURRENCY = 'ADD_CURRENCY',
}

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} 
& Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    [CurrenciesActionTypes.ADD_CURRENCY]({ commit }: AugmentedActionContext, currency: TCurrency): void,   
}

export const actions: ActionTree<State, RootState> & Actions = {
    [CurrenciesActionTypes.ADD_CURRENCY]({ commit }, currency: TCurrency) {
        commit(CurrenciesMutationTypes.ADD_CURRENCY, currency)
    },
};