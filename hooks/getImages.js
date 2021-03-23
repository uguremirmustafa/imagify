import { useQuery } from 'react-query';

export const fetcher = (args) => fetch(args).then((res) => res.json());

export const getImages = () => {
  const url = `https://api.unsplash.com/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`;
  useQuery('fetchImages', fetcher(url));
};
