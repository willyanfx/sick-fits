import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        Sick fits
        <Link href="/">Sick Fits</Link>
      </div>
      <div className="sub-bar">
        <p>search</p>
      </div>
      <Nav />
    </header>
  );
}
