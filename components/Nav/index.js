import MangaOnlineLogo from '../../public/mangaonline-logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/dist/client/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

function Nav() {
  const router = useRouter();
  const [mangaListResult, setMangaListResult] = useState([]);
  const [searchText, setSearchText] = useState('');

  const onChangeSearch = async (mangaTitle) => {
    setSearchText(mangaTitle);

    if (mangaTitle.length > 0) {
      const fetchMangaList = await fetch(
        `/api/search?title=${mangaTitle}`
      ).then((res) => res.json());
      setMangaListResult(fetchMangaList);
      return;
    }
    setMangaListResult([]);
  };

  const goToDetailsPage = (e, mangaId) => {
    e.preventDefault();
    setMangaListResult([]);
    setSearchText('');
    hideSearchInputMobile();
    router.push(`/${mangaId}`);
  };

  const showSearchInputMobile = () => {
    document.getElementById('mangaonline-logo').classList.add('hidden');
    document.getElementById('search-container').classList.remove('hidden');
    document.getElementById('search-back-button').classList.remove('hidden');
    document.getElementById('search-icon-button').classList.add('hidden');
  };

  const hideSearchInputMobile = () => {
    document.getElementById('mangaonline-logo').classList.remove('hidden');
    document.getElementById('search-container').classList.add('hidden');
    document.getElementById('search-back-button').classList.add('hidden');
    document.getElementById('search-icon-button').classList.remove('hidden');
    setSearchText('');
    setMangaListResult([]);
  };

  useEffect(() => {
    hideSearchInputMobile();
  }, [router.query]);

  return (
    <nav className="nav-top">
      <div className="container mx-auto flex flex-wrap justify-between md:justify-start items-center gap-5 py-5 px-4 lg:px-10 xl:px-20">
        <Link href="/">
          <a
            className="md:flex items-center"
            id="mangaonline-logo"
            title="Home"
          >
            <MangaOnlineLogo className="h-12 w-auto" />
          </a>
        </Link>

        <div
          className="md:hidden text-[#374151] cursor-pointer"
          id="search-icon-button"
          onClick={showSearchInputMobile}
          title="Search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="w-6 h-6" />
        </div>

        <div
          className="hidden md:hidden text-[#374151] cursor-pointer"
          id="search-back-button"
          onClick={hideSearchInputMobile}
          title="Back"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="w-6 h-6" />
        </div>

        <div
          className="hidden w-[90%] md:w-auto md:block relative"
          id="search-container"
        >
          <input
            type="text"
            className="w-full rounded-full px-10 bg-[#f1f3f8] focus:ring-transparent focus:outline-none focus:border-[#222831] peer"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              onChangeSearch(e.target.value);
            }}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 top-[50%] text-[#6b7280] translate-y-[-50%] w-4 peer-focus:text-[#222831]"
          />

          {searchText.length > 0 ? (
            <div className="absolute top-12 w-full bg-white shadow-md text-gray-600 rounded-xl overflow-hidden z-10">
              {mangaListResult
                ? mangaListResult.map((manga, index) => (
                    <a
                      href={`/${manga.id}`}
                      key={index}
                      onClick={(e) => goToDetailsPage(e, manga.id)}
                      className="p-2 flex hover:text-rose-500"
                    >
                      <div className="w-1/6 h-16 relative rounded-md overflow-hidden">
                        <Image
                          src={manga.coverImage}
                          alt=""
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <p className="truncate w-5/6 pl-2">{manga.title}</p>
                    </a>
                  ))
                : ''}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
