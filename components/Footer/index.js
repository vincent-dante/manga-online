import MangaOnlineLogo from '../../public/mangaonline-logo.svg';

export default function Footer() {
  return (
    <div className="flex flex-wrap justify-center content-center h-48 footer mt-20 text-white">
      <MangaOnlineLogo className="w-52" />
      <div className="text-base self-center ml-5">
        <span>Copyright © MangaOnline. All Rights Reserved </span>
      </div>
    </div>
  );
}
