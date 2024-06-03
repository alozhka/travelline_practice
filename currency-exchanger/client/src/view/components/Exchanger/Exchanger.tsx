import s from './Exchanger.module.css'
import { format } from 'date-fns'
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker.tsx';
import { useFetch } from '../../../core/hooks.ts';
import { Currency } from '../../../core/types.ts';
import { useRef } from 'react';
import { REFRESH_INTERVAL_MS } from '../../../core/constants.ts';

const getFormattedCurrentDate = () => format(new Date(), 'EEE, dd MMM yyyy HH:mm')


const Exchanger = () => {
  const [data, isLoading] = useFetch<Currency[]>('http://localhost:5081/Currency', REFRESH_INTERVAL_MS);

  const ref = useRef<HTMLInputElement>(null);

  if (isLoading)
    return <span>Загрузка</span>
  else if (!data || data.length === 0)
    return <span>Ошибка</span>;
  return (
      <div className={s.wrapper}>
        <header>
          <h5>1 {data[0].name} is</h5>
          <h3>{data[1].name}</h3>
          <span>{getFormattedCurrentDate()} UTC</span>
        </header>
        <CurrencyPicker ref={ref} currencies={data} currentIndex={0} />
        <CurrencyPicker ref={ref} currencies={data} currentIndex={1} />
        <div className={s.separator}>separator</div>
      </div>
  );
};

export default Exchanger;