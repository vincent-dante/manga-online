import React from 'react';
import Image from 'next/dist/client/image';
import BannerImage from '../../public/banner/spy-x-family.jpg';

function Hero() {
  return (
    <div className="w-full max-h-72 rounded-md overflow-hidden shadow-md relative">
      <Image
        src={BannerImage}
        alt=""
        layout="responsive"
        className="object-cover"
        priority
      />
    </div>
  );
}

export default Hero;
