import React from 'react';
import Image from 'next/dist/client/image';
import Link from 'next/link';

function Card({ manga, chapter }) {
  return (
    <Link href={`${manga.id}`}>
      <a>
        <div className="cursor-pointer card-container text-gray-700 hover:text-rose-500">
          <div className="h-72 sm:h-64 md:h-48 lg:h-60 xl:h-56 2xl:h-64 relative overflow-hidden rounded-md shadow border border-slate-100">
            <Image
              src={manga.coverImage}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-2 text-center card-details ">
            <p>{manga.title}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default Card;
