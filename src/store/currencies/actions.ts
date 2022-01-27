import { ActionTree, ActionContext } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'
import { Mutations, CurrenciesMutationTypes } from './mutations';

import { TCurrency } from '@/types'

export enum CurrenciesActionTypes {
    UPDATE_CURRENCIES = 'UPDATE_CURRENCIES',
    CHANGE_DEFAULT_CURRENCY = 'CHANGE_DEFAULT_CURRENCY'
}

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} 
& Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    [CurrenciesActionTypes.UPDATE_CURRENCIES]({ commit }: AugmentedActionContext, currencies: TCurrency[]): void,   
    [CurrenciesActionTypes.CHANGE_DEFAULT_CURRENCY]({ commit }: AugmentedActionContext, currency: TCurrency): void,   
}

export const actions: ActionTree<State, RootState> & Actions = {
    [CurrenciesActionTypes.UPDATE_CURRENCIES]({ commit }, currencies: TCurrency[]) {
        commit(CurrenciesMutationTypes.UPDATE_CURRENCIES, currencies)
    },
    [CurrenciesActionTypes.CHANGE_DEFAULT_CURRENCY]({ commit }, currency: TCurrency) {
        commit(CurrenciesMutationTypes.CHANGE_DEFAULT_CURRENCY, currency)
    },
};