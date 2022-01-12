import { ICurrency, IRecord, IDebtor, ISegment } from '@/interfaces/index'
import { listOutline, personOutline } from "ionicons/icons";

export const currencies: Array<ICurrency> = [
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

export const debtors: Array<IDebtor> = [
    {
        id: 0,
        name: 'Dominik'
    },
    {
        id: 1,
        name: 'Davydek'
    },
    {
        id: 2,
        name: 'Martynko'
    }
]

export const records: Array<IRecord> = [
    {
        id: 0,
        date: "12. 4. 1997",
        debtorId: 0,
        description:
            "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
        price: 289,
        currencyId: 1,
    },
    {
        id: 1,
        date: "12. 4. 1997",
        debtorId: 1,
        description:
            "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
        price: 289,
        currencyId: 1,
    },
    {
        id: 2,
        date: "12. 4. 1997",
        debtorId: 0,
        description:
            "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
        price: 289,
        currencyId: 2,
    },
    {
        id: 3,
        date: "12. 4. 1997",
        debtorId: 2,
        description:
            "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
        price: 289,
        currencyId: 2,
    },
    {
        id: 4,
        date: "12. 4. 1997",
        debtorId: 1,
        description:
            "Lorem wtf omg asdkja awdjkwdng god momno awd dwdwd dmetruig púpúpú idhj",
        price: 289,
        currencyId: 1,
    },
]

export const formSegments: Array<ISegment> =[
    {
        text: 'Existing person',
        value: 'existing',
        icon: listOutline
    },
    {   
        text: 'New person',
        value: 'new',
        icon: personOutline
    }
]