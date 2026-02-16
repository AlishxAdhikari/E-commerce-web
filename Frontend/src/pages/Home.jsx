import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // Replace the fake URL with your Django API endpoint
  axios.get('http://127.0.0.1:8000/api/products/') 
    .then(res => {
      setProducts(res.data);
      setLoading(false);
    })
    .catch(err => console.log("Backend error:", err));
}, []);

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="w-full">
      {/* HERO SECTION - Blue stretches edge to edge */}
      <section className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <span className="bg-yellow-400 text-blue-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">
              Free Shipping on All Orders
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Discover Tomorrow's <span className="text-yellow-400">Style</span> Today
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-10 opacity-90 max-w-xl">
              Shop curated electronics, jewelry, and fashion with lightning-fast delivery and secure checkout.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-400 text-blue-900 px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl shadow-yellow-400/30">
                Shop Now
              </button>
              <button className="border-2 border-white/40 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                View Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION - Centered in the middle */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter uppercase">Trending Now</h2>
          <div className="h-1 flex-1 bg-gray-100 mx-8 hidden md:block"></div>
          <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}