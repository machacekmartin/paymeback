import { Store as VuexStore, DispatchOptions, CommitOptions, Module } from 'vuex'

import { RootState } from '@/store'

import { state, State } from './state'
import { actions, Actions } from './actions'
import { getters, Getters } from './getters'
import { mutations, Mutations } from './mutations'

export type SettingsStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
& {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>;
}
& {
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>;
}
& {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
}

export const settings: Module<State, RootState> = {
    state,
    mutations,
    getters,
    actions,
}
