'use client';

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Product, ApiResponse } from '@/types/product';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data: ApiResponse<Product> = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const fetchId = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    fetchId();
  }, [params]);

  useEffect(() => {
    if (id) {
      getProduct(id).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center">Cargando...</p>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-block mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Volver a productos
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Imagen del producto */}
          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.nombre}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg
                  className="w-24 h-24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="flex flex-col">
            {product.category && (
              <p className="text-sm text-blue-600 font-medium mb-2">
                {product.category.name}
              </p>
            )}
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.nombre}
            </h1>

            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${Number(product.precio).toFixed(2)}
            </div>

            {product.descripcion && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Descripción
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.descripcion}
                </p>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-gray-200">
              {user && (
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Agregar al carrito
                </button>
              )}
              {!user && (
                <Link 
                  href="/login"
                  className="block w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
                >
                  Inicia sesión para comprar
                </Link>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              ID del producto: {product.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}