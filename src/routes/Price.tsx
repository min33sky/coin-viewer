import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api/coin';
import ApexChart from 'react-apexcharts';

interface ICoinHistory {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: Date;
  time_open: Date;
  volume: number;
}

function Price() {
  const coinId = useOutletContext<string>();
  const { isLoading, data } = useQuery<ICoinHistory[]>('coinHistory', () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'Price',
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: true,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 3,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {
                show: false,
                format: 'dddd/MM',
              },
              type: 'category',
              categories: data?.map((price) => new Date(price.time_close).toLocaleDateString()),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            colors: ['#0fbcf9'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
