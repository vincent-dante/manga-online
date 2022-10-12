import Image from 'next/dist/client/image';
import Link from 'next/link';

// icon
import EyeIcon from '../../public/icon/eye-solid.svg';
import EyeMedal from '../../public/icon/medal-solid.svg';

// utility
import MangaTop10 from '../../utility/top10manga.json';

export default function SideBar() {
  const mangaTop10 = MangaTop10.data;
  let count = 1;

  return (
    <div className="w-full col-span-12 xl:col-span-3 text-sm text-gray-600">
      <div className="bg-white p-5 rounded-md shadow-md">
        <button className="background-secondary text-white mb-5 px-2 py-1 rounded-md cursor-default">
          <EyeMedal className="w-4 inline-block fill-current mr-2" />
          Top Manga
        </button>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {mangaTop10.map((manga) => (
            <Link href={`${manga.id}`} key={manga.id}>
              <a>
                <div className="flex gap-2 w-full h-28 sm:h-20 md:h-24 xl:h-20 cursor-pointer overflow-hidden group hover:text-rose-500">
                  <div className="w-1/5 self-center">
                    <div className="text-2xl p-1 font-bold rounded-md border-slate-400 border group-hover:border-rose-500 text-center">
                      {count++}
                    </div>
                  </div>
                  <div className="w-1/5">
                    <div className="h-full relative rounded-md overflow-hidden">
                      <Image
                        src={manga.coverImage}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                  <div className="w-3/5">
                    <p className="topmanga-title">{manga.title}</p>
                    <p className="pt-1">
                      <EyeIcon
                        width={16}
                        height={16}
                        className="inline-block mr-1 fill-current"
                      />
                      {manga.views}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
