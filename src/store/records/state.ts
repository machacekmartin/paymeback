import { TRecord } from '@/types'

export type State = {
    records: TRecord[];
}

export const state: State = {
    records: JSON.parse(localStorage.getItem('records') as string) || []
}
