import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/dist/client/image';

// components
import SideBar from '../../components/SideBar';

// icon
import StarIcon from '../../public/icon/star-solid.svg';

export default function Details() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    id: '',
    coverImage: '',
    title: '',
    genres: [],
    description: '',
  });
  const [chapter, setChapter] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/details?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDetails(res);
        setLoading(false);
      });

    fetch(`/api/chapter?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        setChapter(res.chapter);
      });
  }, [id]);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!details) return <p className="text-center">No profile data</p>;

  return (
    <>
      <Head>
        <title>MangaOnline - {details.title && details.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
                  <div className="bg-slate-50 hover:text-rose-500" key={index}>
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
