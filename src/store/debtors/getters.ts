import { GetterTree } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'

import { TDebtor } from '@/types'

export type Getters = {
    debtors(state: State): TDebtor[]
}

export const getters : GetterTree<State, RootState> & Getters = {
    debtors: (state) => state.debtors,
}