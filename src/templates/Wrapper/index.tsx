import Styled from './styles';
import Header from '../Header';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Styled.Wrapper>
      <Header />
      {children}
    </Styled.Wrapper>
  );
};

export default Wrapper;
