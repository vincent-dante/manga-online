import Nav from '../Nav';
import Footer from '../Footer';

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
