import { MutationTree } from 'vuex'

import { State } from './state'

import { TRecord } from '@/types'

export enum RecordsMutationTypes {
    ADD_RECORD = 'ADD_RECORD',
    REMOVE_RECORD = 'REMOVE_RECORD'
}

export type Mutations<S = State> = {
    [RecordsMutationTypes.ADD_RECORD](state: S, payload: TRecord ) :void,
    [RecordsMutationTypes.REMOVE_RECORD](state: S, payload: string ) :void
}

export const mutations: MutationTree<State> & Mutations = {
    [RecordsMutationTypes.ADD_RECORD](state: State, record: TRecord) {
        state.records.push(record)
        localStorage.setItem('records', JSON.stringify(state.records))
    },
    [RecordsMutationTypes.REMOVE_RECORD](state: State, id: string) {
        const targetIndex = state.records.findIndex(record => record.id === id)
        state.records.splice(targetIndex, 1)
        localStorage.setItem('records', JSON.stringify(state.records))
    }
}
