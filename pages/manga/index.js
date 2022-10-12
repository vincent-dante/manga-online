import Bolt from '../../public/icon/bolt-lightning-solid.svg';

// components
import Card from '../../components/Card';

// utility
import MangaData from '../../utility/manga.json';

export default function Manga() {
  const manga = MangaData.data;
  return (
    <>
      <div className="container mx-auto px-2 lg:px-32 py-2.5 pt-20">
        <div className="section-title">
          <Bolt width={24} height={24} className="mr-2" />
          <span>Manga</span>
        </div>
        <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 pt-5 pb-20">
          {manga.map((manga) => (
            <Card key={manga.id} manga={manga} chapter="new chapters" />
          ))}
          {manga.map((manga) => (
            <Card key={manga.id} manga={manga} chapter="new chapters" />
          ))}
        </div>
      </div>
    </>
  );
}
