import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import Layout from '@c/Layout';
import FlexyRow from '@c/FlexyRow';
import { Title } from '@c/Title';
import { getShowBySlug } from '@l/graphcms';
import { formatUSD, formatDate } from '@l/utils';
import Markdown from '../../components/Markdown';
import Portrait from '../../components/Portrait';

const ArtistName = styled.h2`
  text-align: center;
`;



export default function Shows({ show }) {
  return (
    <Layout
      title={`${show.title} / next-graphcms-shows`}
      maxWidth="900px"
      padding="0 2em"
    >
      <Title>{show.title}</Title>
      <FlexyRow>
        <span>Price: {formatUSD(show.ticketPrice)}</span>
        <span>{formatDate(show.scheduledStartTime)}</span>
      </FlexyRow>
      <Markdown source={show.description} />
      {show.artists.map((artist) => (
        <a href={`/artist/${artist.slug}`} key={artist.id}>
          <ArtistName>{artist.fullName}</ArtistName>
          <Portrait images={artist.images} />
        </a>
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const show = await getShowBySlug(slug);

  return {
    props: { show },
  };
}
