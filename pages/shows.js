import styled from 'styled-components';
import Layout from '@c/Layout';
import { Grid, Card, List } from '@c/CardArrangement';
import { Title } from '@c/Title';
import { getAllShows } from '@l/graphcms';
import { useEffect, useState } from 'react';

const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  .left {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
  }

  .sort-wrapper {
    display: flex;
    align-items: flex-start;
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

  .arrangement-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0 0 0.5rem;

    .list {
      padding: 0 1rem;
    }
  }

  .icon {
    &:hover {
      cursor: pointer;
    }
  }

  @media (min-width: 600px) {
    min-width: 800px;
  }
`;

export default function Shows({ shows }) {
  const [isAscending, setIsAscending] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isGrid, setIsGrid] = useState(true);

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
          <div className="left">
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
            <div className="arrangement-wrapper">
              <div className="icon grid" onClick={() => setIsGrid(true)}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9327 14.7226H1.24361C0.812309 14.7226 0.462265 15.0726 0.462265 15.5039V25.1942C0.462265 25.6255 0.812309 25.9755 1.24361 25.9755H10.9327C11.364 25.9755 11.7141 25.6255 11.7141 25.1942V15.5039C11.7141 15.0726 11.364 14.7226 10.9327 14.7226ZM10.1514 24.4128H2.02496V16.2853H10.1514V24.4128V24.4128Z"
                    fill="white"
                  />
                  <path
                    d="M11.7141 1.75376C11.7141 1.32246 11.364 0.972412 10.9327 0.972412H1.24361C0.812309 0.972412 0.462265 1.32246 0.462265 1.75376V11.4432C0.462265 11.8745 0.812309 12.2246 1.24361 12.2246H10.9327C11.364 12.2246 11.7141 11.8745 11.7141 11.4432V1.75376V1.75376ZM10.1514 10.6619H2.02496V2.53511H10.1514V10.6619V10.6619Z"
                    fill="white"
                  />
                  <path
                    d="M25.4623 1.75376C25.4623 1.32246 25.1122 0.972412 24.6809 0.972412H14.9918C14.5605 0.972412 14.2105 1.32246 14.2105 1.75376V11.4432C14.2105 11.8745 14.5605 12.2246 14.9918 12.2246H24.6809C25.1122 12.2246 25.4623 11.8745 25.4623 11.4432V1.75376ZM23.8996 10.6619H15.7732V2.53511H23.8996V10.6619Z"
                    fill="white"
                  />
                  <path
                    d="M24.6809 14.7226H14.9918C14.5605 14.7226 14.2105 15.0726 14.2105 15.5039V25.1942C14.2105 25.6255 14.5605 25.9755 14.9918 25.9755H24.6809C25.1122 25.9755 25.4623 25.6255 25.4623 25.1942V15.5039C25.4623 15.0726 25.1126 14.7226 24.6809 14.7226ZM23.8996 24.4128H15.7732V16.2853H23.8996V24.4128Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div className="icon list" onClick={() => setIsGrid(false)}>
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.1383 10.388H1.76168C1.04448 10.388 0.462982 10.8072 0.462982 11.5244V15.2581C0.462982 15.9753 1.04448 16.5568 1.76168 16.5568H25.1383C25.8555 16.5568 26.437 15.9753 26.437 15.2581V11.5244C26.437 10.8072 25.8555 10.388 25.1383 10.388ZM25.1383 15.2581H1.76168V11.6867H25.1383V15.2581ZM25.1383 0.972412H1.76168C1.04448 0.972412 0.462982 1.39157 0.462982 2.10878V5.84254C0.462982 6.55975 1.04448 7.14124 1.76168 7.14124H25.1383C25.8555 7.14124 26.437 6.55975 26.437 5.84254V2.10878C26.437 1.39157 25.8555 0.972412 25.1383 0.972412ZM25.1383 5.84254H1.76168V2.27111H25.1383V5.84254ZM25.1383 19.8036H1.76168C1.04448 19.8036 0.462982 20.2227 0.462982 20.9399V24.6737C0.462982 25.3909 1.04448 25.9724 1.76168 25.9724H25.1383C25.8555 25.9724 26.437 25.3909 26.437 24.6737V20.9399C26.437 20.2227 25.8555 19.8036 25.1383 19.8036ZM25.1383 24.6737H1.76168V21.1023H25.1383V24.6737Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
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

      {isGrid ? (
        <Grid>
          {shows.map((show) => (
            <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
              <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
            </Card>
          ))}
        </Grid>
      ) : (
        <List>
          {shows.map((show) => (
            <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
              <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
            </Card>
          ))}
        </List>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const shows = (await getAllShows()) || [];
  return {
    props: { shows },
  };
}
