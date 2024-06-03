import React, { forwardRef } from 'react';
import { Currency } from '../../../core/types.ts';

import s from './CurrencyPicker.module.css'


interface PickerProps {
  currencies: Currency[];
  currentIndex: number;
}

const CurrencyPicker = forwardRef((props: PickerProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={s.wrapper}>
      <input ref={ref} />
      <select defaultValue={props.currencies[props.currentIndex].code}>
        { props.currencies.map((currency =>
          <option key={currency.code} value={currency.code}>{currency.code}</option>))
        }
        </select>
    </div>
  )
})


export default CurrencyPicker