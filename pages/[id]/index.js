import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/dist/client/image';

// components
import SideBar from '../../components/SideBar';

// icon
import StarIcon from '../../public/icon/star-solid.svg';
import NotFound from '../../public/not-found.svg';

export default function Details() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState({
    id: '',
    coverImage: '',
    title: '',
    genres: [],
    description: '',
  });
  const [chapter, setChapter] = useState([]);
  const [noRecordFound, setNoRecordFound] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const detailsFetch = new Promise((resolve, reject) => {
      fetch(`/api/details?id=${id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.data.length !== 0) {
            setDetails(...res.data);
          }
          resolve(res.data);
        });
    });

    const chapterFetch = new Promise((resolve, reject) => {
      fetch(`/api/chapter?id=${id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.data.length != 0) {
            setChapter(res.data[0].chapter);
          }
          resolve(res.data);
        });
    });

    Promise.all([detailsFetch, chapterFetch]).then((values) => {
      setLoading(false);
      const [details, chapter] = values;
      if (details.length === 0 && chapter.length === 0) {
        setNoRecordFound(true);
      }
    });
  }, [id, router.isReady]);

  if (isLoading) return;

  if (noRecordFound) {
    return (
      <div className="container mx-auto py-5 px-3 lg:px-10 xl:px-20 text-gray-700">
        <div className="w-80 mx-auto">
          <NotFound />
        </div>
        <h1 className="text-center my-5">No Manga Found</h1>
        <div className="text-center">
          <Link href="/">
            <a className="background-secondary text-white mb-5 px-2 py-1 rounded-md">
              Go back home
            </a>
          </Link>
        </div>
      </div>
    );
  }

  if (!isLoading && !noRecordFound) {
    return (
      <>
        <Head>
          <title>MangaOnline - {details.title && details.title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="container mx-auto py-5 px-3 lg:px-10 xl:px-20 text-gray-700">
          <div className="grid grid-cols-12 gap-5">
            <div className="w-full col-span-12 xl:col-span-9 text-sm">
              <div className="grid grid-cols-9 gap-5 mb-5">
                <div className="col-span-full w-full sm:col-span-3 lg:col-span-2 h-[34rem] sm:h-[18rem] xl:h-[18rem] relative shadow-lg overflow-hidden rounded-md">
                  {details.coverImage && (
                    <Image
                      src={details.coverImage}
                      alt=""
                      layout="fill"
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
                <div className="col-span-full w-full sm:col-span-6 lg:col-span-7">
                  <h1 className="text-2xl mb-2 font-bold">
                    {details.title && details.title}
                  </h1>
                  <div className="flex mb-5">
                    <div className="grid grid-cols-[13%_87%] lg:grid-cols-[7%_93%] grid-flow-row items-center gap-2 w-full">
                      <p className="w-32">Authors:</p>
                      <p></p>

                      <p className="w-32">Status:</p>
                      <p>Ongoing</p>

                      <p className="w-32">Genre:</p>
                      <p>
                        {' '}
                        {details.genres &&
                          details.genres.map((genre, index) => (
                            <span className="" key={index}>
                              {(index ? ', ' : '') + genre}
                            </span>
                          ))}
                      </p>

                      <p className="w-32">Views:</p>
                      <p>{details.views}</p>

                      <p className="w-32">Rating:</p>
                      <div className="fill-current">
                        <StarIcon className="w-4 h-4 inline-block" />
                        <StarIcon className="w-4 h-4 inline-block" />
                        <StarIcon className="w-4 h-4 inline-block" />
                        <StarIcon className="w-4 h-4 inline-block" />
                        <StarIcon className="w-4 h-4 inline-block" />
                      </div>
                    </div>
                  </div>
                  <p className="mb-1">Description:</p>
                  <p>{details.description && details.description}</p>
                </div>
              </div>
              <div className="w-full divide-y divide-slate-300 shadow rounded-md overflow-hidden">
                {chapter &&
                  chapter.map((chp, index) => (
                    <div
                      className="bg-slate-50 hover:text-rose-500"
                      key={index}
                    >
                      <Link href={`/${id}/chapter/${chp.id}`}>
                        <a className="inline-block py-3 pl-5 rounded-sm cursor-pointer">
                          {chp.title}
                        </a>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-full col-span-12 xl:col-span-3 text-sm">
              <SideBar />
            </div>
          </div>
        </div>
      </>
    );
  }
}
