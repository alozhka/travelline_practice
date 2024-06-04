import s from './Separator.module.css'
import arrowUp from './arrow-up.svg'
import { useRef } from 'react';

interface SeparatorProps {
  paymentCurrencyCode: string,
  purchasedCurrencyCode: string,
  onClick?: () => void
}

const Separator = (props: SeparatorProps) => {
  const ref = useRef<HTMLImageElement>(null);
  
  return (
    <div className={s.separator}>
      <button className={s.button} onClick={() => {
        if (props.onClick) {
          props.onClick();
          ref.current?.classList.toggle(s.rotate);
      }}}>
        {props.paymentCurrencyCode}/{props.purchasedCurrencyCode}: about 
        <img ref={ref} src={arrowUp} className={s.arrowUp} alt='arrow-up' />
      </button>
    </div>
  )
}


export default Separator