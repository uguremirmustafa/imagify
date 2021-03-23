import React, { useState } from 'react';
import { getImages } from '../hooks/getImages';
import { useQuery } from 'react-query';
import cn from '../styles/Home.module.css';
export default function index() {
  const [page, setPage] = useState(1);
  const url = `https://api.unsplash.com/photos?page=${page}`;
  const { data, error, isLoading } = useQuery(['images', page], () =>
    fetch(url, {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`,
      },
    }).then((res) => res.json())
  );
  const [active, setActive] = useState('');
  console.log(active);
  data && console.log(data);
  if (error) return <div>error</div>;
  return (
    <div className={cn.container}>
      <div className={cn.imageWrapper}>
        {isLoading && <div className={cn.loader}>loading</div>}
        {data?.slice(0, 6).map((image) => (
          <div
            className={cn.singleImageWrapper}
            key={image.id}
            style={{
              width: active === image.id ? '500px' : '100px',
            }}
            onClick={() => {
              setActive(image.id);
            }}
          >
            <img src={image.urls.regular} alt={image.alt_description} className={cn.image} />
            <div className={active === image.id ? cn.imageInfoActive : cn.imageInfo}>
              {image.alt_description}
            </div>
          </div>
        ))}
      </div>
      <div>
        {page > 1 && (
          <button className={cn.button} onClick={() => setPage((p) => p - 1)}>
            prev
          </button>
        )}
        <button className={cn.button} onClick={() => setPage((p) => p + 1)}>
          next
        </button>
      </div>
    </div>
  );
}
