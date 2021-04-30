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
    justify-content: space-between;
    padding: 1rem 1.5rem 0 1.5rem;
    width: 100%;

    .arrow-icon {
      margin-left: 1rem;
    }

    .sort-direction {
      display: flex;
      align-items: center;
      justify-content: center;
    }

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
  const [isAscending, setIsAscending] = useState(false);
  const [isTitle, setIsTitle] = useState(false);

  const handleSortByTitle = (descending) => {
    setIsTitle(true);
    let sorted = shows.sort((a, b) => (a.title > b.title ? 1 : -1));
    console.log('title', `isAscending: ${isAscending}`, sorted);
    return descending ? sorted : sorted.reverse();
  };

  const handleSortByStartTime = (descending) => {
    setIsTitle(false);
    let sorted = shows.sort((a, b) =>
      a.scheduledStartTime > b.scheduledStartTime ? -1 : 1
    );
    console.log('start time', `isAscending: ${isAscending}`, sorted);
    return descending ? sorted : sorted.reverse();
  };

  useEffect(() => {
    // handleSortBy(isTitle, isDescending);
    // setIsAscending(false);
    isTitle
      ? handleSortByTitle(isAscending)
      : handleSortByStartTime(isAscending);
  }, [isTitle, isAscending]);

  return (
    <Layout title="next-graphcms-shows / Shows" maxWidth="800px">
      <HeaderContainer>
        <Title>Shows</Title>
        <div className="sort-wrapper">
          <div>
            <button
              className="sort-btn"
              style={
                isTitle
                  ? { backgroundColor: 'white', color: 'black' }
                  : { backgroundColor: 'transparent', color: 'white' }
              }
              onClick={() => handleSortByTitle(!isAscending)}
            >
              Title
            </button>
            <button
              className="sort-btn"
              style={
                !isTitle
                  ? { backgroundColor: 'white', color: 'black' }
                  : { backgroundColor: 'transparent', color: 'white' }
              }
              onClick={() => handleSortByStartTime(!isAscending)}
            >
              Start Time
            </button>
          </div>

          <button
            className="sort-direction"
            onClick={() => setIsAscending(!isAscending)}
            // style={{ display: 'flex' }}
          >
            {isAscending ? 'Ascending' : 'Descending'}{' '}
            <svg
              className="arrow-icon"
              width="18"
              height="11"
              viewBox="0 0 18 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={
                isAscending
                  ? { transform: 'rotate(180deg)' }
                  : { transform: 'rotate(0deg)' }
              }
            >
              <path
                d="M10.5179 9.45104L17.7275 2.24076L16.3318 0.846069L9.12187 8.05568L2.24131 1.17479L0.845947 2.56981L9.12187 10.8461L10.5179 9.45104Z"
                fill="white"
              />
            </svg>
          </button>
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
