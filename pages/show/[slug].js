import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Layout from '@c/Layout'
import FlexyRow from '@c/FlexyRow'
import { Title } from '@c/Title'
import { getShowBySlug } from '@l/graphcms'
import { formatUSD, formatDate } from '@l/utils'

const Markdown = styled(ReactMarkdown)`
  img {
    width: 100%;
    border-radius: 20px;
    border: 4px solid currentColor;
  }
`

const ArtistName = styled.h2`
  text-align: center;
`

const ArtistPhoto = styled.div`
  background-image: url(${(p) => p.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 4px solid currentColor;
  margin: 0 auto;
`

const Portrait = ({ images = [] }) => {
  if (images.length > 0) {
    const img = images[0]
    return (
      <ArtistPhoto imageUrl={img.url} />
    )
  }
  return null
}

export default function Shows({ show }) {
  
  function checkProtocol(link)
  {
    if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
      console.log("The link has http or https.");
      return true;
    }
    else{
      console.log("The link doesn't have http or https.");
      return false;
    }
  }
  
  return (
    <Layout title={`${show.title} / next-graphcms-shows`} maxWidth="900px" padding="0 2em">
      <Title>{show.title}</Title>

      <FlexyRow>
        <span>Price: {formatUSD(show.ticketPrice)}</span>
        <span>{formatDate(show.scheduledStartTime)}</span>
      </FlexyRow>

      <Markdown source={show.description} />

      {show.artists.map(artist => (
        <div key={artist.id}>
          <ArtistName>{artist.fullName}</ArtistName>

          <Portrait images={artist.images} />

          <FlexyRow justify="flex-start">
            {artist.webUrl && <a href={checkProtocol(artist.webUrl) ? artist.webUrl : `https://${artist.webUrl}`} target="_blank">Website</a>}
            {artist.facebookUrl && <a href={artist.facebookUrl} target="_blank">Facebook</a>}
            {artist.instagramUrl && <a href={artist.instagramUrl} target="_blank">Instagram</a>}
            {artist.youTubeUrl && <a href={artist.youTubeUrl} target="_blank">YouTube</a>}
          </FlexyRow>

          <Markdown source={artist.bio} />
        </div>
      ))}
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params
  const show = (await getShowBySlug(slug))

  return {
    props: { show },
  }
}
