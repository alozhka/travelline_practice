import { ExchangeRate } from './types.ts';

const fetchExchangeRates = async (purchasedCode: string, paymentCode: string): Promise<ExchangeRate[]> => {
  const date = new Date()
  date.setMinutes(date.getMinutes() - 5)
  return await fetch(
    `http://localhost:5081/prices?PaymentCurrency=${paymentCode}&PurchasedCurrency=${purchasedCode}&FromDateTime=${date.toISOString()}`
  )
    .then(res => res.json())
}


const fetchCurrentExchange = async (purchasedCode: string, paymentCode: string): Promise<number> => {
  const rates: ExchangeRate[] = await fetchExchangeRates(purchasedCode, paymentCode)

  const latestRate = rates.pop()
  if(!latestRate) throw new Error('Ошибка на стороне сервера')

  return latestRate.price
}


export { fetchExchangeRates, fetchCurrentExchange }