import { ExchangeRate } from './types.ts';

const fetchCurrentExchange = async (purchasedCode: string, paymentCode: string): Promise<number> => {
  const date = new Date()
  date.setMinutes(date.getMinutes() - 5)
  const rates: ExchangeRate[] = await fetch(
    `http://localhost:5081/prices?PaymentCurrency=${paymentCode}&PurchasedCurrency=${purchasedCode}&FromDateTime=${date.toISOString()}`
  )
    .then(res => res.json())

  const latestRate = rates.pop()
  if(!latestRate) throw new Error('Ошибка на стороне сервера')

  return latestRate.price
}


export { fetchCurrentExchange }