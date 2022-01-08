import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchAllCoins } from '../api/coin';

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 720px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 0 10px;
    width: 100%;
  }
`;

export const Header = styled.header`
  height: 15vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

export const CoinList = styled.ul`
  /*  */
`;

export const CoinItem = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  font-weight: 400;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
    transform: scale(105%);
    transition: all 0.25s ease-out;
  }
`;

export const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export default function Coins() {
  const { isLoading, data } = useQuery(['allCoins', 100], () => fetchAllCoins(100));

  return (
    <Container>
      <Helmet>
        <title>Coin Viewer</title>
      </Helmet>

      <Header>
        <Title>Coin Viewer</Title>
      </Header>

      {isLoading ? (
        'Loading....'
      ) : (
        <CoinList>
          {data?.map((coin) => (
            <CoinItem key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </CoinItem>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
