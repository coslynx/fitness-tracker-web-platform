import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 mt-8 text-center text-gray-600">
      <div className="container">
        <p>© {new Date().getFullYear()} Fitness Tracker. All rights reserved.</p>
        <Link href="/terms">Terms of Service</Link>{' '}
        |{' '}
        <Link href="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
}