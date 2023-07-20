import { GetterTree } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'

export type Getters = {
    iban(state: State): string,
}

export const getters : GetterTree<State, RootState> & Getters = {
    iban: (state) => state.iban
}
