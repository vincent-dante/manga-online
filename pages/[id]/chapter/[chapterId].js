import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/dist/client/image';
import Head from 'next/head';

import AngleRightArrow from '../../../public/icon/angle-right-solid.svg';
import AngleLeftArrow from '../../../public/icon/angle-left-solid.svg';
import ArrowLeftLongArrow from '../../../public/icon/arrow-left-long-solid.svg';

export default function Details() {
  const router = useRouter();

  const { id, chapterId } = router.query;
  const [selectedChapter, setSelectedChapter] = useState({});
  const [chapterList, setChapterList] = useState([]);
  const [details, setDetails] = useState({
    id: '',
    coverImage: '',
    title: '',
    genres: [],
    description: '',
  });

  const changeChapter = (e) => {
    e.preventDefault();
    let { value } = e.target;
    router.push(value);
  };

  const onClickPrevChapter = () => {
    let selectedChapterId = parseInt(selectedChapter.id);
    if (selectedChapterId > 1) {
      router.push(`/${id}/chapter/${--selectedChapterId}`);
    }
  };

  const onClickNextChapter = () => {
    let selectedChapterId = parseInt(selectedChapter.id);

    const lastChapter = chapterList.reduce((prev, current) => {
      return prev.id > current.id ? prev : current;
    });

    if (lastChapter.id == selectedChapterId) return;
    router.push(`/${id}/chapter/${++selectedChapterId}`);
  };

  useEffect(() => {
    fetch(`/api/chapter?id=${id}&chapterId=${chapterId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.chapter) {
          for (const chp of res.chapter) {
            if (chp.id === chapterId) setSelectedChapter(chp);
          }

          setChapterList(res.chapter);
        }
      });

    fetch(`/api/details?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDetails(res);
      });
  }, [id, chapterId]);

  return (
    <>
      <Head>
        <title>
          MangaOnline - {selectedChapter.title && selectedChapter.title}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="container mx-auto py-5 px-3 lg:px-10 xl:px-20 text-gray-600">
        <Link href={`/${id}`}>
          <a className="inline-flex items-center cursor-pointer flex-wrap mb-10">
            <ArrowLeftLongArrow className="fill-current w-4 h-4 mr-2" />
            Back
          </a>
        </Link>

        <h2 className="text-center pb-10 text-3xl font-bold">
          {details.title}
          <span className="block text-base pt-2 font-normal">
            {selectedChapter.title}
          </span>
        </h2>

        <ChapterNavigation
          {...{
            id,
            selectedChapter,
            chapterList,
            changeChapter,
            onClickPrevChapter,
            onClickNextChapter,
          }}
        />
        <div className="w-full md:w-3/4 xl:w-1/2 mx-auto my-20">
          {selectedChapter.image &&
            selectedChapter.image.map((img, index) => (
              <div
                className="imageContainer mb-5 relative shadow-md border border-slate-100 p-2 bg-white min-h-32"
                key={index}
              >
                <Image alt="" src={img} layout="fill" className="image" />
              </div>
            ))}
        </div>
        <ChapterNavigation
          {...{
            id,
            selectedChapter,
            chapterList,
            changeChapter,
            onClickPrevChapter,
            onClickNextChapter,
          }}
        />
      </div>
    </>
  );
}

function ChapterNavigation({
  id,
  selectedChapter,
  chapterList,
  changeChapter,
  onClickPrevChapter,
  onClickNextChapter,
}) {
  return (
    <div className="grid grid-cols-3 justify-items-center w-full md:w-3/4 xl:w-1/2 mx-auto">
      <button
        className="background-secondary text-white rounded-md p-2 w-auto"
        onClick={() => {
          onClickPrevChapter();
        }}
      >
        <AngleLeftArrow className="fill-current mx-auto w-9 h-6" />
      </button>
      <select
        name="cars"
        id="cars"
        className=" bg-white rounded border border-gray-400 focus:border-gray-400 focus:ring-transparent w-full"
        onChange={changeChapter}
        value={`/${id}/chapter/${selectedChapter.id}`}
      >
        {chapterList &&
          chapterList.map((chp, index) => (
            <option value={`/${id}/chapter/${chp.id}`} key={index}>
              {chp.title}
            </option>
          ))}
      </select>
      <button
        className="background-secondary text-white rounded-md p-2 w-auto"
        onClick={() => {
          onClickNextChapter();
        }}
      >
        <AngleRightArrow className="fill-current mx-auto w-9 h-6" />
      </button>
    </div>
  );
}
