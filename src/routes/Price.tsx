import { useOutletContext } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../store/themeAtom';
import { PriceData } from '../types/coin';

const Container = styled.div`
  /*  */
`;

const PriceItem = styled.div<{ darkmode: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.darkmode ? '#273c75' : 'silver')};
  border-radius: 10px;

  padding: 10px 20px;
  margin-bottom: 10px;

  p {
    &:first-of-type {
      font-weight: bold;
    }
  }
`;

function Price() {
  const [_, priceData] = useOutletContext<[string, PriceData]>();
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Container>
      <PriceItem darkmode={isDark}>
        <p>시가 총액: </p>
        <p>${priceData.quotes.USD.market_cap.toLocaleString()}</p>
      </PriceItem>
      <PriceItem darkmode={isDark}>
        <p>시가 총액 변동률 (24시간): </p>
        <p>{priceData.quotes.USD.market_cap_change_24h}%</p>
      </PriceItem>
      <PriceItem darkmode={isDark}>
        <p>최고 가격 날짜:</p>
        <p>{new Date(priceData.quotes.USD.ath_date).toLocaleDateString()}</p>
      </PriceItem>
      <PriceItem darkmode={isDark}>
        <p>최고 가격:</p>
        <p>${priceData.quotes.USD.ath_price.toLocaleString()}</p>
      </PriceItem>
      <PriceItem darkmode={isDark}>
        <p>시세 변동률 (24시간): </p>
        <p>{priceData.quotes.USD.volume_24h_change_24h}%</p>
      </PriceItem>
    </Container>
  );
}

export default Price;
