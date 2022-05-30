import axios from 'axios';
import { fetcher } from '../queryClient';
import { ICoin } from '../types/coin';

const BASE_URL = `https://api.coinpaprika.com/v1`;

/**
 * 모든 코인 정보를 가져오는 함수
 * @param cursor 마지막으로 가져온 데이터의 ID
 * @param keyword 검색할 코인의 이름
 * @returns 코인 데이터를 담은 배열
 */
export async function fetchAllCoins({ cursor, keyword }: { cursor: string; keyword?: string }) {
  let data = await fetcher<ICoin[]>({
    method: 'GET',
    path: '/coins',
  });

  keyword = keyword?.toLowerCase();

  if (keyword !== '') {
    const filtered = data.filter((coin) => coin.name.toLowerCase().startsWith(keyword || ''));
    let fromIndex = filtered.findIndex((item) => item.id === cursor) + 1;
    return filtered.slice(fromIndex, fromIndex + 20) || [];
  }

  //* 인피니트 로딩을 위한 다음 데이터 위치 찾기
  let fromIndex = data.findIndex((item) => item.id === cursor) + 1;

  return data.slice(fromIndex, fromIndex + 20) || [];
}

/**
 * 코인 세부 정보를 가져오는 함수
 * @param coinId 코인 아이디
 * @returns 코인 정보 객체
 */
export async function fetchCoinInfo(coinId: string) {
  const { data } = await axios.get(`${BASE_URL}/coins/${coinId}`);
  return data;
}

/**
 * 코인 가격에 관한 정보를 가져오는 함수
 * @param coinId 코인 아이디
 * @returns 코인 가격 객체
 */
export async function fetchCoinTicker(coinId: string) {
  const { data } = await axios.get(`${BASE_URL}/tickers/${coinId}`);
  return data;
}

export async function fetchCoinHistory(coinId: string) {
  // 1개월 데이터 가져오기
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 4;
  const { data } = await axios.get(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  );
  return data;
}
