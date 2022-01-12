export interface IRecord{
    id: number;
    date: string;
    debtorId: number;
    description: string;
    price: number;
    currencyId: number;
}

export interface IDebtor{
    id: number,
    name: string
}

export interface ICurrency{
    id: number,
    name: string,
    short: string,
    symbol: string
}

export interface ISegment{
    text: string;
    value: string;
    icon: string
}

export interface ISelectorOption{
    text: string,
    value: string | number 
}

export interface ISegment{
    text: string,
    value: string,
    icon: string
}