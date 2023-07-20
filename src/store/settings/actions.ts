import { ActionTree, ActionContext } from 'vuex'

import { RootState } from '@/store'
import { State } from './state'
import { Mutations, SettingsMutationTypes } from './mutations';

export enum SettingsActionTypes {
    CHANGE_IBAN = 'CHANGE_IBAN'
}

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
}
& Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    [SettingsActionTypes.CHANGE_IBAN]({ commit }: AugmentedActionContext, iban: string): void,
}

export const actions: ActionTree<State, RootState> & Actions = {
    [SettingsActionTypes.CHANGE_IBAN]({ commit }, iban: string) {
        commit(SettingsMutationTypes.CHANGE_IBAN, iban)
    },
};
