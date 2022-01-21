import { TSelectorOption } from '@/types/index'

export const convertToOptions = (array: Array<any>, valueKey: string, textKey: string): Array<TSelectorOption> => {
    return array.map((item): TSelectorOption => {
        return {
            value: item[valueKey],
            text: item[textKey]
        }
    })
}