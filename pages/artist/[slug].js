import Markdown from '../../components/Markdown';
import styled from 'styled-components';
import Layout from '@c/Layout';
import FlexyRow from '@c/FlexyRow';
import { Title } from '@c/Title';
import { getArtistBySlug } from '@l/graphcms';
import Portrait from '../../components/Portrait';

const ArtistName = styled(Title)`
  text-align: center;
`;

export default function Artist({ artist }) {
  function checkProtocol(link) {
    if (link.indexOf('http://') === 0 || link.indexOf('https://') === 0) {
      console.log('The link has http or https.');
      return true;
    } else {
      console.log("The link doesn't have http or https.");
      return false;
    }
  }

  return (
    <Layout
      title={`${artist.fullName} / next-graphcms-shows`}
      maxWidth="900px"
      padding="0 2em"
    >
      <div key={artist.id}>
        <ArtistName>{artist.fullName}</ArtistName>
        <Portrait images={artist.images} />
        <FlexyRow justify="flex-start">
          {artist.webUrl && (
            <a
              href={
                checkProtocol(artist.webUrl)
                  ? artist.webUrl
                  : `https://${artist.webUrl}`
              }
              target="_blank"
            >
              Website
            </a>
          )}
          {artist.facebookUrl && (
            <a href={artist.facebookUrl} target="_blank">
              Facebook
            </a>
          )}
          {artist.instagramUrl && (
            <a href={artist.instagramUrl} target="_blank">
              Instagram
            </a>
          )}
          {artist.youTubeUrl && (
            <a href={artist.youTubeUrl} target="_blank">
              YouTube
            </a>
          )}
          {artist.spotifyUrl && (
            <a href={artist.spotifyUrl} target="_blank">
              Spotify
            </a>
          )}
        </FlexyRow>

        <Markdown source={artist.bio} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const artist = await getArtistBySlug(slug);
  console.log(artist);
  return {
    props: { artist },
  };
}
