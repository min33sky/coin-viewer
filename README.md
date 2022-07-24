# Coin Viewer

코인 정보와 가격을 보여준다

## Getting Started

```bash
npm start
```

## Stacks

- react
- styled-components
- react-router (v6)

## TODO

[] API 정책 변경으로 기간별 가격 보기 불가

## Coding Note

### React-Router (v6)에서 useLocation() 타입 분제

Generic 설정이 삭제되어서 아래와 같이 사용

```js
import { Location } from 'react-router-dom';

export type LocationProps = Location & {
  // state가 unknown 타입이므로 필요에 맞게 수정한다.
  state: {
    name: string;
  };
};

const { state } = useLocation() as LocationProps;

```
