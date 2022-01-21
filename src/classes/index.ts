import { TDebtor, TRecord } from '@/types/index'
import { useStore } from '@/store'

export class Record implements TRecord {

    id: string;
    debtorId: string;
    description: string;
    price: number | undefined;
    currencyId: number;
    date: string;
    time: string;

    constructor() {
        this.id = 'id' + (new Date()).getTime();
        this.debtorId = useStore().getters.debtors[0]?.id;
        this.description = '';
        this.price = undefined;
        this.currencyId = 0 // Vuex.currencies[0].value // currenciesAsOptions[0].value as number;
        this.date = new Date().toISOString();
        this.time = new Date().toISOString();
    }
}

export class Debtor implements TDebtor {
    
    id: string;
    name: string;

    constructor(name: string) {
        this.id = 'id-' + (new Date()).getTime();
        this.name = name
    }
}

