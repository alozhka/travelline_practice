import React, { forwardRef } from 'react';
import { Currency } from '../../../core/types.ts';

interface PickerProps {
  currencies: Currency[];
  currentIndex: number;
}

const CurrencyPicker = forwardRef((props: PickerProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <div>
      <input ref={ref} />
      <select>
        {props.currencies.map(((currency, index) => 
          <option key={index} value={currency.code}>{currency.name}</option>))
        }
        </select>
    </div>
  )
})


export default CurrencyPicker