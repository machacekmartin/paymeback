import { TDebtor, TRecord, TCurrency } from '@/types/index'
import { useStore } from '@/store'

const store = useStore()

export class Record implements TRecord {

    id: string;
    debtorId: string;
    description: string;
    price: number | undefined;
    currency: TCurrency;
    date: string;
    time: string;

    constructor() {
        this.id = 'id' + (new Date()).getTime();
        this.debtorId = store.getters.debtors[0]?.id;
        this.description = '';
        this.price = undefined;
        this.currency = store.getters.defaultCurrency;
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