import { createStore } from 'vuex'
import { TRecord, TDebtor } from '@/types'
import { records as recordsStore, RecordsStore } from './records'
import { debtors as debtorsStore, DebtorsStore } from './debtors'

export type RootState = {
    records: TRecord[],
    debtors: TDebtor[]
}

export type Store = RecordsStore <Pick<RootState, 'records'>> & DebtorsStore <Pick<RootState, 'debtors'>>; 

export const store = createStore({
    modules: {
        recordsStore,
        debtorsStore
    }
})
export function useStore(): Store{
    return store as Store
}

import { TCurrency } from '@/types/index'

export const currencies: Array<TCurrency> = [
    {
        id: 0,
        name: 'US Dollar',
        short: 'USD',
        symbol: '$'
    },
    {
        id: 1,
        name: 'Euro',
        short: 'EUR',
        symbol: '€'
    },
    {
        id: 2,
        name: 'Czech Crown',
        short: 'CZK',
        symbol: '?'
    },
]

