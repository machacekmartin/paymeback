export type State = {
    iban: string,
}

export const state: State = {
    iban: JSON.parse(localStorage.getItem('iban') as string),
}
