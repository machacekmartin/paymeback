export type TRecord = {
    id: string;
    date: string;
    time: string;
    debtorId: string;
    description: string;
    price: number | undefined;
    currency: TCurrency;
}

export type TDebtor = {
    id: string,
    name: string
}

export type TCurrency = string

export type TSelectorOption = {
    text: string,
    value: string | number
}

export type TSegment = {
    text: string;
    value: string;
    icon: string
}

