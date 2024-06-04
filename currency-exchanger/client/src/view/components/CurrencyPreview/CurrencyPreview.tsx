import { CurrencyInfo } from '../../../core/types.ts';

interface CurrencyPreviewProps {
  currency: CurrencyInfo
}

const CurrencyPreview = ({ currency }: CurrencyPreviewProps) => {
  return (
    <div>
      <h3>{currency.name} - {currency.code} - {currency.symbol}</h3>
      <p>{currency.description}</p>
    </div>
  )
}


export default CurrencyPreview