import { GetterTree } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'

import { TRecord } from '@/types'

export type Getters = {
    records(state: State): TRecord[],   
}

export const getters : GetterTree<State, RootState> & Getters = {
    records: (state) => state.records,
}