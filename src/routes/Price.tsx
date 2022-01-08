import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { PriceData } from '../types/coin';

const Container = styled.div`
  /*  */
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #273c75;
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

  return (
    <Container>
      <PriceItem>
        <p>시가 총액: </p>
        <p>${priceData.quotes.USD.market_cap.toLocaleString()}</p>
      </PriceItem>
      <PriceItem>
        <p>시가 총액 변동률 (24시간): </p>
        <p>{priceData.quotes.USD.market_cap_change_24h}%</p>
      </PriceItem>
      <PriceItem>
        <p>최고 가격 날짜:</p>
        <p>{new Date(priceData.quotes.USD.ath_date).toLocaleDateString()}</p>
      </PriceItem>
      <PriceItem>
        <p>최고 가격:</p>
        <p>${priceData.quotes.USD.ath_price.toLocaleString()}</p>
      </PriceItem>
      <PriceItem>
        <p>시세 변동률 (24시간): </p>
        <p>{priceData.quotes.USD.volume_24h_change_24h}%</p>
      </PriceItem>
    </Container>
  );
}

export default Price;
