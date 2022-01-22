import { createStore } from 'vuex'
import { TRecord, TDebtor } from '@/types'
import { records, RecordsStore } from './records'
import { debtors, DebtorsStore } from './debtors'
import { currencies, CurrenciesStore } from './currencies'

export type RootState = {
    records: TRecord[],
    debtors: TDebtor[],
    currencies: TCurrency[]
}

export type Store = RecordsStore <Pick<RootState, 'records'>> 
                    & DebtorsStore <Pick<RootState, 'debtors'>> 
                    & CurrenciesStore <Pick<RootState, 'currencies'>>; 

export const store = createStore({
    modules: {
        records,
        debtors,
        currencies
    }
})
export function useStore(): Store{
    return store as Store
}

import { TCurrency } from '@/types/index'


