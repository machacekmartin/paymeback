import { TDebtor, TRecord, TCurrency } from '@/types/index'
import { useStore } from '@/store'

const store = useStore()

export class Record implements TRecord {

    id: string;
    debtorId: string;
    description: string;
    price: number | undefined;
    currency: TCurrency;
    datetime: string;

    constructor() {
        this.id = new Date().getTime().toString();
        this.debtorId = store.getters.debtors[0]?.id;
        this.description = '';
        this.price = undefined;
        this.currency = store.getters.defaultCurrency;
        this.datetime = new Date().toISOString();
    }
}

export class Debtor implements TDebtor {
    
    id: string;
    name: string;

    constructor(name: string) {
        this.id = new Date().getTime().toString();
        this.name = name
    }
}

