import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ExchangeRate } from '../../../core/types.ts';
import { useFetch } from '../../../core/hooks.ts';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'ExchangeRateChart.js Line ExchangeRateChart',
    },
  },
}

interface ChartProps {
  purchasedCode: string,
  paymentCode: string
}
const ExchangeRateChart = (props: ChartProps) => {
  const date = new Date()
  date.setMinutes(date.getMinutes() - 5)
  const [exchanges] = useFetch<ExchangeRate[]>(
    (`http://localhost:5081/prices?PaymentCurrency=${props.paymentCode}&PurchasedCurrency=${props.purchasedCode}&FromDateTime=${date.toISOString()}`),
    10000,
    [props.purchasedCode, props.paymentCode]
  )

  if(!exchanges) return <div>Ошибка</div>

  const data: ChartData<'line', number[], string> = {
    labels: ['5min', '4min', '3min', '2min', '1min'],
    datasets : [
      {
        label: `${props.purchasedCode}/${props.paymentCode}`,
        data: exchanges.map(exchange => exchange.price),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }
  return <Line data={data} options={options} />
}


export default ExchangeRateChart