import Link from 'next/link';
import styled, { css } from 'styled-components';
import { truncateText } from '@l/utils';

const CardStyle = css`
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid var(--gallery-grey);
  border-radius: 10px;
  transition: 150ms ease;
  width: 100%;
  margin: 0 0 1rem 0;

  :hover,
  :focus,
  :active {
    color: #000;
    background-color: var(--gallery-grey);
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }

  @media (min-width: 600px) {
    margin: 1rem;
  }
`;

const StyledGrid = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  //margin-top: 1rem;
  width: 100%;
  padding: 1rem;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const StyledList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  //margin-top: 1rem;
  width: 100%;
  padding: 1rem;

  //@media (min-width: 600px) {
  //  flex-direction: row;
  //  align-items: flex-start;
  //  justify-content: space-between;
  //}
`;

function Card({ children, header, href, title }) {
  return href ? (
    <Link href={href} passHref>
      <a css={CardStyle} title={title}>
        <h3>{header} &rarr;</h3>
        {children}
      </a>
    </Link>
  ) : (
    <div css={CardStyle} title={title}>
      <h3 title={header}>{truncateText(header, 22)} &rarr;</h3>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return <StyledGrid>{children}</StyledGrid>;
}

function List({ children }) {
  return <StyledList>{children}</StyledList>;
}

export { Card, Grid, List };