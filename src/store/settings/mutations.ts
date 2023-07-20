import { MutationTree } from 'vuex'

import { State } from './state'

export enum SettingsMutationTypes {
    CHANGE_IBAN = 'CHANGE_IBAN',
}

export type Mutations<S = State> = {
    [SettingsMutationTypes.CHANGE_IBAN](state: S, iban: string) :void,
}

export const mutations: MutationTree<State> & Mutations = {
    [SettingsMutationTypes.CHANGE_IBAN](state: State, iban: string) {
        state.iban = iban
        localStorage.setItem('iban', JSON.stringify(state.iban))
    },
}
