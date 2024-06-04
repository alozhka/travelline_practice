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


export type { GetCurrencyRequest, CurrencyInfo, Currency, CurrencyPair }