import { TDebtor } from '@/types'

export type State = {
    debtors: TDebtor[];
}

export const state: State = {
    debtors: JSON.parse(localStorage.getItem('debtors') as string) || []
}
