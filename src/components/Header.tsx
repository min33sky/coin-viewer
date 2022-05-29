import { FaArrowLeft, FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../store/themeAtom';

export const Container = styled.header`
  height: 15vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.headerColor};
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  transition: all 0.25s ease-out;

  &:hover {
    color: tomato;
  }
`;

const ToggleTheme = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  cursor: pointer;
`;

function Header({ title }: { title?: string }) {
  const location = useLocation();
  const isDark = useRecoilValue(isDarkAtom);
  const setDark = useSetRecoilState(isDarkAtom);

  const changeMode = () => setDark((prev) => !prev);

  return (
    <Container>
      {location.pathname !== '/' && (
        <BackLink to="/">
          <FaArrowLeft size={20} />
        </BackLink>
      )}

      <Title>{title}</Title>

      <ToggleTheme>
        {isDark ? (
          <FaToggleOn onClick={changeMode} size={28} />
        ) : (
          <FaToggleOff onClick={changeMode} size={28} />
        )}
      </ToggleTheme>
    </Container>
  );
}

export default Header;
