import axios from 'axios';
import { QueryClient } from 'react-query';

const BASE_URL = `https://api.coinpaprika.com/v1`;

/**
 * react-query client 싱글톤 객체 생성 함수
 */
export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client) {
      // 쿼리 클라이언트 생성
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 하루동안 캐시
            staleTime: 1000 * 60, // 1분간 리패치 금지
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    }
    return client;
  };
})();

type FetcherBodyParams = {
  [key: string]: any;
};

type FetcherVariables = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  body?: FetcherBodyParams;
  params?: FetcherBodyParams;
};

export async function fetcher<T = any>({
  method,
  path,
  body,
  params,
}: FetcherVariables): Promise<T> {
  const { data } = await axios({
    method,
    baseURL: BASE_URL,
    url: path,
    data: body,
    params,
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': BASE_URL,
    },
    timeout: 3000,
  });

  return data;
}

export const QueryKeys = {
  AlL_COINS: 'ALL_COINS',
};
