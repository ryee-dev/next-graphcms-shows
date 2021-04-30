import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const Markdown = styled(ReactMarkdown)`
  img {
    width: 100%;
    border-radius: 20px;
    border: 4px solid currentColor;
  }
`;

export default Markdown;
