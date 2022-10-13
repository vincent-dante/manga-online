import Link from 'next/link';
import Illustrations from '../public/404.svg';

export default function NotFound() {
  return (
    <div className="container mx-auto py-5 px-3 lg:px-10 xl:px-20 text-gray-700">
      <div className="w-96 mx-auto">
        <Illustrations />
      </div>
      <h1 className="text-center my-5">404 - Page Not Found</h1>
      <div className="text-center">
        <Link href="/">
          <a className="background-secondary text-white mb-5 px-2 py-1 rounded-md">
            Go back home
          </a>
        </Link>
      </div>
    </div>
  );
}
