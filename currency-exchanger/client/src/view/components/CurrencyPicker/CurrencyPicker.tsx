import React, { ChangeEvent, forwardRef, useRef } from 'react';
import { Currency, CurrencyInfo } from '../../../core/types.ts';

import s from './CurrencyPicker.module.css'


interface PickerProps {
  currencies: CurrencyInfo[]
  currency: Currency
  onInputChange?: (newAmount: number) => void
  onSelectChange?: (newCurrency: string) => void
}



const CurrencyPicker = forwardRef((props: PickerProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    if(props.onInputChange && ref && 'current' in ref && ref.current && value >= 0) {
      ref.current.value = value.toFixed(2)
      props.onInputChange(value)
    }
  }
  const handleSelect = () => {
    if (props.onSelectChange && selectRef.current) {
      props.onSelectChange(selectRef.current.value)
    }
  }

  return (
    <div className={s.wrapper}>
      <input ref={ref} type='number' min='0'
             onChange={handleChange}
             value={props.currency.amount} />
      <select value={props.currency.code}
              ref={selectRef}
              onChange={handleSelect}>
        { props.currencies.map((currency =>
          <option key={currency.code} value={currency.code}>{currency.code}</option>))
        }
        </select>
    </div>
  )
})


export default CurrencyPicker