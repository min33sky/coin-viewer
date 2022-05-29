import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchAllCoins } from '../api/coin';
import { isDarkAtom } from '../store/themeAtom';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Header from '../components/Header';

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 720px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 0 10px;
    width: 100%;
  }
`;

export const CoinList = styled.ul`
  /*  */
`;

export const CoinItem = styled.li<{ darkmode: boolean }>`
  background-color: ${(props) => (props.darkmode ? 'whitesmoke' : '#192a56')};
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
  const isDark = useRecoilValue(isDarkAtom);
  const setDark = useSetRecoilState(isDarkAtom);

  const changeMode = () => setDark((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>Coin Viewer</title>
      </Helmet>

      <Header title="Coins" />

      {isLoading ? (
        'Loading....'
      ) : (
        <CoinList>
          {data?.map((coin) => (
            <CoinItem key={coin.id} darkmode={isDark}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
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
