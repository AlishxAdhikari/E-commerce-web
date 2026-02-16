import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null); // State for the gallery switcher

  const backendURL = "http://127.0.0.1:8000";

  useEffect(() => {
    axios.get(`${backendURL}/api/products/${id}/`)
      .then(res => {
        setProduct(res.data);
        // Set the initial main image from the primary image field
        setActiveImage(res.data.image);
        setLoading(false);
      })
      .catch(err => {
        console.error("Django Error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center text-xl font-semibold">
      <div className="animate-pulse">Loading product details...</div>
    </div>
  );

  if (!product) return (
    <div className="h-screen flex items-center justify-center text-xl text-red-500">
      Product not found!
    </div>
  );

  // Helper function to format image URLs
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.startsWith('http') ? imagePath : `${backendURL}${imagePath}`;
  };

  return (
    <div className="container mx-auto p-4 md:p-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
        
        {/* LEFT SIDE: Image Gallery */}
        <div className="w-full md:w-1/2">
          {/* Main Large Display */}
          <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-2xl p-5 mb-4 overflow-hidden border border-gray-50">
            <img 
              src={getFullImageUrl(activeImage)} 
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-all duration-500 transform hover:scale-105" 
            />
          </div>

          {/* Thumbnail List (If multiple images exist) */}
          {product.images && product.images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {/* Primary Image Thumbnail */}
              <button 
                onClick={() => setActiveImage(product.image)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden bg-gray-50 ${activeImage === product.image ? 'border-blue-600' : 'border-transparent'}`}
              >
                <img src={getFullImageUrl(product.image)} className="w-full h-full object-cover" alt="primary" />
              </button>

              {/* Related Gallery Thumbnails */}
              {product.images.map((imgObj) => (
                <button 
                  key={imgObj.id}
                  onClick={() => setActiveImage(imgObj.image)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden bg-gray-50 ${activeImage === imgObj.image ? 'border-blue-600' : 'border-transparent'}`}
                >
                  <img src={getFullImageUrl(imgObj.image)} className="w-full h-full object-cover" alt="gallery" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* RIGHT SIDE: Product Info */}
        <div className="flex flex-col justify-center w-full md:w-1/2">
          <div className="mb-6">
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mt-4 mb-2">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              <div className="flex items-center bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
                ★ {product.rating_rate || "0.0"}
              </div>
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-6 mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Product Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl transition-all active:scale-95 shadow-lg shadow-blue-200">
              Add to Cart
            </button>
            <button className="px-8 py-4 rounded-2xl border-2 border-gray-200 font-bold text-gray-400 hover:bg-gray-50 transition-all">
              ♡ Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}