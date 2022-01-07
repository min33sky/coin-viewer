import { useQuery } from 'react-query';
import { Link, Outlet, useLocation, useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTicker } from '../api/coin';
import { InfoData, PriceData, LocationProps } from '../types/coin';
import { Container, Header } from './Coins';

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  align-items: center;
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;

  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};

  a {
    padding: 7px 0;
    display: block;
  }
`;

export default function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation() as LocationProps;

  const priceMatch = useMatch(`/:coinId/price`);
  const chartMatch = useMatch(`/:coinId/chart`);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData | undefined>(
    ['coinStatus', coinId],
    () => (coinId ? fetchCoinInfo(coinId) : undefined)
  );

  const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData | undefined>(
    ['coinTicker', coinId],
    () => (coinId ? fetchCoinTicker(coinId) : undefined)
  );

  const loading = infoLoading || tickerLoading;

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? 'Loading' : infoData?.name}</Title>
      </Header>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? 'Yes' : 'No'}</span>
            </OverviewItem>
          </Overview>

          <Description>{infoData?.description}</Description>

          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
          </Tabs>

          {/* Nested Router: 방식 1 */}
          {/* <Routes>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Routes> */}

          {/* 방식 2 */}
          <Outlet />
        </>
      )}
    </Container>
  );
}