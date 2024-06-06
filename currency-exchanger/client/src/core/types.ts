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
    price: number
}

const enum CurrencyType {
    Purchased,
    Payment
}

type ExchangeRate = {
    purchasedCurrencyCode: string,
    paymentCurrencyCode: string,
    price: number,
    dateTime: Date
}


export type { GetCurrencyRequest, CurrencyInfo, Currency, CurrencyPair, ExchangeRate }
export { CurrencyType }