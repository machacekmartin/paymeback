import { ISelectorOption } from '@/interfaces/index'

export const convertToOptions = (array: Array<any>, valueKey: string, textKey: string): Array<ISelectorOption> => {
    return array.map((item): ISelectorOption => {
        return {
            value: item[valueKey],
            text: item[textKey]
        }
    })
}