import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
          ⚡ ZAPPSTORE
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/products" className="hover:text-blue-600 transition">Shop</Link>
          <Link to="/categories" className="hover:text-blue-600 transition">Categories</Link>
        </div>

        <Link to="/cart" className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition">
          🛒
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">0</span>
        </Link>
      </div>
    </nav>
  );
}