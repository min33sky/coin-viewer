import { Helmet } from 'react-helmet-async';
import { useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { fetchAllCoins } from '../api/coin';
import { isDarkAtom } from '../store/themeAtom';
import Header from '../components/Header';
import { QueryKeys } from '../queryClient';
import React, { useEffect, useRef, useState } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import useDebounce from '../hooks/useDebounce';
import { FaSearch } from 'react-icons/fa';

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 1080px;
  margin: 0 auto;
`;

export const CoinList = styled.ul`
  display: grid;
  margin-top: 1rem;

  @media screen and (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media screen and (min-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
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

const Form = styled.form`
  position: relative;
  display: flex;
  margin: 10px 0;
  border-radius: 10px;
  overflow: hidden;

  input {
    flex: 1;
    padding: 10px 15px;
    outline: none;
    border: none;
    font-size: large;
  }

  button {
    border: none;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    color: black;
  }
`;

export const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

/**
 * 코인 리스트를 출력하는 컴포넌트
 * @returns
 */
export default function Coins() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);

  const { isLoading, data, fetchNextPage } = useInfiniteQuery(
    [QueryKeys.AlL_COINS, debouncedKeyword],
    ({ pageParam = '' }) => fetchAllCoins({ cursor: pageParam, keyword: debouncedKeyword }),
    {
      getNextPageParam: (lastpage, pages) => {
        return lastpage.at(-1)?.id;
      },
      enabled: !!debouncedKeyword,
      suspense: false,
    }
  );

  const isDark = useRecoilValue(isDarkAtom);

  /**
   ** 인피니트 스크롤
   */
  useEffect(() => {
    if (!intersecting) return;
    fetchNextPage();
  }, [fetchNextPage, intersecting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('keyword: ', keyword);
  };

  return (
    <Container>
      <Helmet>
        <title>Coin Viewer</title>
      </Helmet>

      <Header title="Coins" />

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Your Coin"
        />
        <FaSearch />
        {/* <button>검색</button> */}
      </Form>

      {isLoading ? (
        <div>
          <p>Loading...🚀</p>
        </div>
      ) : (
        <CoinList>
          {data?.pages.map((page) =>
            page.map((coin) => (
              <CoinItem key={coin.id} darkmode={isDark}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </CoinItem>
            ))
          )}
        </CoinList>
      )}

      <div style={{ opacity: 0 }} ref={fetchMoreRef}>
        More Fetch
      </div>
    </Container>
  );
}
