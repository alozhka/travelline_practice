import s from './Exchanger.module.css';
import { format } from 'date-fns';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker.tsx';
import { useFetch, useToggle } from '../../../core/hooks.ts';
import { CurrencyPair, GetCurrencyRequest } from '../../../core/types.ts';
import { useEffect, useRef, useState } from 'react';
import Separator from '../Separator/Separator.tsx';
import CurrencyPreview from '../CurrencyPreview/CurrencyPreview.tsx';

const getFormattedCurrentDate = () => format(new Date(), 'EEE, dd MMM yyyy HH:mm')


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
  
  if (pair) return (
    <div className={s.wrapper}>
      <header>
        <h5>1 {currencies[0].name} is</h5>
        <h3>{currencies[1].name}</h3>
        <span>{getFormattedCurrentDate()} UTC</span>
      </header>
      <CurrencyPicker ref={purchasedRef} currencies={currencies} onInputChange={(a: number) =>
        setPair({...pair, purchased: {...pair.purchased, amount: a }})
      } currency={pair.purchased} />
      <CurrencyPicker ref={paymentRef} currencies={currencies} onInputChange={(a: number) =>
        setPair({...pair, payment: {...pair.payment, amount: a }})
      }  currency={pair.payment} />
      <Separator paymentCurrencyCode={pair.purchased.code}
                 purchasedCurrencyCode={pair.payment.code}
                 onClick={() => toggle()} />
      { isToggled &&
        <>
          <CurrencyPreview currency={pair.purchased} />
          <CurrencyPreview currency={pair.payment} />
        </>
      }
    </div>
  ) 
}

export default Exchanger;