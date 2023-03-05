import MangaOnlineLogo from '../../public/mangaonline-logo.svg';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-wrap justify-center content-center h-48 footer mt-20 text-white">
      <MangaOnlineLogo className="w-52 mx-auto" />
      <div className="text-sm ml-5 w-full text-center pt-5 text-gray-400">
        <span>© {year} MangaOnline.</span>
      </div>
    </div>
  );
}
