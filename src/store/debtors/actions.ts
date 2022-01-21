import { ActionTree, ActionContext } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'
import { Mutations, DebtorsMutationTypes } from './mutations';

import { TDebtor } from '@/types'


export enum DebtorsActionTypes {
    ADD_DEBTOR = 'ADD_DEBTOR',
}

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} 
& Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    [DebtorsActionTypes.ADD_DEBTOR]({ commit }: AugmentedActionContext, debtor: TDebtor): void,   
}

export const actions: ActionTree<State, RootState> & Actions = {
    [DebtorsActionTypes.ADD_DEBTOR]({ commit }, debtor: TDebtor) {
        commit(DebtorsMutationTypes.ADD_DEBTOR, debtor)
    },
};