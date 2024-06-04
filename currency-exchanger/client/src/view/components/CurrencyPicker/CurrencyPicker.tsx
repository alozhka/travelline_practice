import React, { forwardRef } from 'react';
import { Currency, CurrencyInfo } from '../../../core/types.ts';

import s from './CurrencyPicker.module.css'


interface PickerProps {
  currencies: CurrencyInfo[];
  currency: Currency;
  onInputChange?: (newAmount: number) => void;
}



const CurrencyPicker = forwardRef((props: PickerProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={s.wrapper}>
      <input ref={ref} type='number' 
             onChange={() => props.onInputChange && props.onInputChange(ref?.current.valueAsNumber)} 
             defaultValue={props.currency.amount} />
      <select defaultValue={props.currency.code}>
        { props.currencies.map((currency =>
          <option key={currency.code} value={currency.code}>{currency.code}</option>))
        }
        </select>
    </div>
  )
})


export default CurrencyPicker