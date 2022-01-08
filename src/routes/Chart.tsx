import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api/coin';
import ApexChart from 'react-apexcharts';
import { PriceData } from '../types/coin';

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

function Chart() {
  const [coinId] = useOutletContext<[string, PriceData]>();
  const { isLoading, data } = useQuery<ICoinHistory[]>(
    'coinHistory',
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((coin) => ({
                x: new Date(coin.time_close),
                y: [
                  coin.open.toFixed(2),
                  coin.high.toFixed(2),
                  coin.low.toFixed(2),
                  coin.close.toFixed(2),
                ],
              })),
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
              width: 2,
            },
            yaxis: {
              show: true,
            },
            xaxis: {
              axisBorder: { show: true },
              axisTicks: { show: true },
              labels: {
                show: true,
              },
              type: 'datetime',
              categories: data?.map((price) => new Date(price.time_close).toLocaleDateString()),
            },
            // tooltip: {
            //   y: {
            //     formatter: (value) => `$${value.toFixed(2)}`,
            //   },
            // },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
