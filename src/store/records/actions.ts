import { ActionTree, ActionContext } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'
import { Mutations, RecordsMutationTypes } from './mutations';

import { TRecord } from '@/types'

export enum RecordsActionTypes {
    ADD_RECORD = 'ADD_RECORD',
    PAYBACK_RECORD = 'PAYBACK_RECORD'
}

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} 
& Omit<ActionContext<State, RootState>, 'commit'>


export interface Actions {
    [RecordsActionTypes.ADD_RECORD]({ commit }: AugmentedActionContext, record: TRecord): void,
    [RecordsActionTypes.PAYBACK_RECORD]({ commit }: AugmentedActionContext, id: string): void
}

export const actions: ActionTree<State, RootState> & Actions = {
    [RecordsActionTypes.ADD_RECORD]({ commit }, record: TRecord) {
        commit(RecordsMutationTypes.ADD_RECORD, record)
    },
    [RecordsActionTypes.PAYBACK_RECORD]({ commit }, id: string) {
        commit(RecordsMutationTypes.PAYBACK_RECORD, id)
    }
};