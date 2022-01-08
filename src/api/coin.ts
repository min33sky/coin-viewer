import axios from 'axios';
import { ICoin } from '../types/coin';

const BASE_URL = `https://api.coinpaprika.com/v1`;

/**
 * 모든 코인 정보를 가져오는 함수
 * @param limits 불러올 코인 개수
 * @returns 코인 데이터를 담은 배열
 */
export async function fetchAllCoins(limits: number) {
  const { data } = await axios.get<ICoin[]>(`${BASE_URL}/coins`);
  return data.slice(0, limits);
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
