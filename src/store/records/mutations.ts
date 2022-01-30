import { MutationTree } from 'vuex'

import { State } from './state'

import { TRecord } from '@/types'

export enum RecordsMutationTypes {
    ADD_RECORD = 'ADD_RECORD',
    PAYBACK_RECORD = 'PAYBACK_RECORD'
}

export type Mutations<S = State> = {
    [RecordsMutationTypes.ADD_RECORD](state: S, payload: TRecord ) :void,
    [RecordsMutationTypes.PAYBACK_RECORD](state: S, payload: string ) :void
}

export const mutations: MutationTree<State> & Mutations = {
    [RecordsMutationTypes.ADD_RECORD](state: State, record: TRecord) {
        state.records.push(record)
        localStorage.setItem('records', JSON.stringify(state.records))
    },

    [RecordsMutationTypes.PAYBACK_RECORD](state: State, id: string) {
        const targetIndex = state.records.findIndex(record => record.id === id)
        state.records[targetIndex].paybackDatetime = new Date().toISOString();
        localStorage.setItem('records', JSON.stringify(state.records))
    }
}
