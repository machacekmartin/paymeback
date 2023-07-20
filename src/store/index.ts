import { createStore } from 'vuex'
import { TRecord, TDebtor, TSettings } from '@/types'
import { records, RecordsStore } from './records'
import { debtors, DebtorsStore } from './debtors'
import { currencies, CurrenciesStore } from './currencies'
import { settings, SettingsStore } from './settings'

export type RootState = {
    records: TRecord[],
    debtors: TDebtor[],
    currencies: TCurrency[],
    settings: TSettings,
}

export type Store = RecordsStore <Pick<RootState, 'records'>>
                    & DebtorsStore <Pick<RootState, 'debtors'>>
                    & CurrenciesStore <Pick<RootState, 'currencies'>>
                    & SettingsStore <Pick<RootState, 'settings'>>;

export const store = createStore({
    modules: {
        records,
        debtors,
        currencies,
        settings,
    }
})
export function useStore(): Store{
    return store as Store
}

import { TCurrency } from '@/types/index'
