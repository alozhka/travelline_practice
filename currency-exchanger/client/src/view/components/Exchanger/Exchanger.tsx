import s from './Exchanger.module.css';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker.tsx';
import { useFetch, useToggle } from '../../../core/hooks.ts';
import { CurrencyPair, CurrencyType, GetCurrencyRequest } from '../../../core/types.ts';
import { useEffect, useRef, useState } from 'react';
import Separator from '../Separator/Separator.tsx';
import CurrencyPreview from '../CurrencyPreview/CurrencyPreview.tsx';
import { getFormattedCurrentDate } from '../../../core/utils.ts';
import { fetchCurrentExchange } from '../../../core/requests.ts';


const Exchanger = () => {
  const [currencies, isLoading] = useFetch<GetCurrencyRequest>('http://localhost:5081/Currency')
  const [isToggled, toggle] = useToggle(false)
  const [pair, setPair] = useState<CurrencyPair | undefined>(undefined)
  const paymentRef = useRef<HTMLInputElement>(null)
  const purchasedRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (currencies)
      setPair({
        purchased: {...currencies[0], amount: 0},
        payment: {...currencies[1], amount: 0}
      })
  }, [isLoading])

  if (isLoading) // если загрузка
    return <span>Загрузка</span>

  if (!currencies || currencies.length === 0) // загрузили и получили ошибку
    return <span>Ошибка</span>

  if (pair) {
    const handleInputChange = async(newAmount: number, type: CurrencyType) => {
      const rate = await fetchCurrentExchange(pair.purchased.code, pair.payment.code)
      switch (type) {
        case CurrencyType.Purchased:
          setPair({ payment: {...pair.payment, amount: newAmount / rate}, purchased: {...pair.purchased, amount: newAmount}})
          break
        case CurrencyType.Payment:
          setPair({ purchased: {...pair.purchased, amount: newAmount * rate}, payment: {...pair.payment, amount: newAmount}})
      }
    }
    const handleSelect = async(code: string, type: CurrencyType) => {
      const newCurrency = currencies.find((c) => c.code === code)
      if (!newCurrency) return

      if(Object.values(pair).some(c => c.code === code)) {
        setPair({purchased: pair.payment, payment: pair.purchased})
        return;
      }
      switch (type) {
        case CurrencyType.Purchased:
          const ratePurchased = await fetchCurrentExchange(newCurrency.code, pair.payment.code)
          setPair({ ...pair, purchased: { ...newCurrency, amount: pair.payment.amount * ratePurchased } })
          break
        case CurrencyType.Payment:
          const ratePayment = await fetchCurrentExchange(pair.purchased.code, newCurrency.code)
          setPair({ ...pair, payment: { ...newCurrency, amount: pair.purchased.amount / ratePayment } })
      }
    }
    return (
      <div className={s.wrapper}>
        <header>
          <h5>1 {currencies[0].name} is</h5>
          <h3>{currencies[1].name}</h3>
          <span>{getFormattedCurrentDate()} UTC</span>
        </header>
        <CurrencyPicker ref={purchasedRef} currencies={currencies}
                        onInputChange={(a) => handleInputChange(a, CurrencyType.Purchased)}
                        onSelectChange={(code: string) => handleSelect(code, CurrencyType.Purchased)}
                        currency={pair.purchased} />
        <CurrencyPicker ref={paymentRef} currencies={currencies}
                        onInputChange={(a) => handleInputChange(a, CurrencyType.Payment)}
                        onSelectChange={(code: string) => handleSelect(code, CurrencyType.Payment)}
                        currency={pair.payment} />
        <Separator paymentCurrencyCode={pair.purchased.code}
                   purchasedCurrencyCode={pair.payment.code}
                   onClick={() => toggle()} />
        {isToggled &&
          <>
            <CurrencyPreview currency={pair.purchased} />
            <CurrencyPreview currency={pair.payment} />
          </>
        }
      </div>
    )
  }
}

export default Exchanger