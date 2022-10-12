import Head from 'next/head';

// icon
//import FireIcon from '../public/icon/fire-solid.svg';

// components
import Card from '../components/Card';
import Hero from '../components/Hero';
import SideBar from '../components/SideBar';

// utility
import MangaData from '../utility/manga.json';

export default function Home() {
  const manga = MangaData.data;

  return (
    <>
      <Head>
        <title>MangaOnline</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container mx-auto py-5 px-3 lg:px-10 xl:px-20">
        <div className="grid grid-cols-12 gap-5">
          {/* Main content */}
          <div className="w-full col-span-12 xl:col-span-9">
            <div className="w-full mb-10">
              <Hero />
            </div>

            {/*             <div className="section-title py-5 text-lg">
              <FireIcon width={24} height={24} className="mr-2" />
              <span>Hot Updates</span>
            </div> */}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-5 gap-5">
              {manga
                // .filter((item, index) => index < 10)
                .map((manga) => (
                  <Card key={manga.id} manga={manga} chapter="new chapters" />
                ))}
            </div>
          </div>
          {/* Side content */}
          <SideBar />
        </div>
      </div>
    </>
  );
}
