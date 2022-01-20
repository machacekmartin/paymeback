import { IDebtor, IRecord } from '@/interfaces/index'

// IMPORT DEBTORS VUEX & CURRENCIES VUEX

export class Record implements IRecord{

    id: number;
    debtorId: number;
    description: string;
    price: number;
    currencyId: number;
    date: string;
    time: string;

    constructor(){
        this.id = new Date().getTime() + Math.floor(Math.random() * 100000);
        this.debtorId = 0 // Vuex.debtors[0].value // debtorsAsOptions[0].value as number;
        this.description = '';
        this.price = 1490;
        this.currencyId = 0 // Vuex.currencies[0].value // currenciesAsOptions[0].value as number;
        this.date = new Date().toISOString();
        this.time = new Date().toISOString();
    }
}

export class Debtor implements IDebtor{

    id: number;
    name: string;

    constructor(name: string){
        this.id = new Date().getTime() + Math.floor(Math.random() * 100000);
        this.name = name
    }
}

