type GetCurrencyRequest =  CurrencyInfo[];

type CurrencyInfo = {
    code: string,
    name: string,
    description: string,
    symbol: string
}

type Currency = CurrencyInfo & {
    amount: number
}

type CurrencyPair = {
    purchased: Currency,
    payment: Currency,
}

const enum CurrencyType {
    Purchased,
    Payment
}


export type { GetCurrencyRequest, CurrencyInfo, Currency, CurrencyPair }
export { CurrencyType }