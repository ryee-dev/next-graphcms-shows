import styled from 'styled-components';
import Layout from '@c/Layout';
import { Grid, Card } from '@c/Grid';
import { Title } from '@c/Title';
import { getAllShows } from '@l/graphcms';
import { useEffect, useState } from 'react';

const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  .sort-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1.5rem;
    width: 100%;
    //padding-top: 1rem;

    button {
      border-radius: 10px;
      padding: 0.6rem 1rem;
      background-color: transparent;
      color: white;
      border: white 1px solid;
      margin: 0 0.5rem;
    }
  }
`;

export default function Shows({ shows }) {
  const [isDescending, setIsDescending] = useState(true);
  const handleSortBy = (option, descending) => {
    let sorted;
    if (option === 'title') {
      // if (descending === isDescending) {
      //   setIsDescending(!isDescending);
      // }
      sorted = shows.sort((a, b) => (a.title > b.title ? 1 : -1));
      setIsDescending(!isDescending);
      console.log(isDescending);
      return descending ? sorted : sorted.reverse();
    } else {
    }
  };

  useEffect(() => {
    // shows.sort((a, b) => (a.title > b.title ? 1 : -1));
    // console.log(shows);

    // console.log(handleSortBy('title', isDescending));
    handleSortBy('title', isDescending);
  }, []);

  return (
    <Layout title="next-graphcms-shows / Shows" maxWidth="800px">
      <HeaderContainer>
        <Title>Shows</Title>
        <div className="sort-wrapper">
          <button
            className="sort-btn"
            onClick={() => handleSortBy('title', isDescending)}
          >
            Alphabetically (toggle order)
          </button>
          <button className="sort-btn">Start Time</button>
        </div>
      </HeaderContainer>
      <Grid>
        {shows.map((show) => (
          <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
            <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
          </Card>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  const shows = (await getAllShows()) || [];
  return {
    props: { shows },
  };
}
