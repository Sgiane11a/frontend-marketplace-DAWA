'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <div className="relative h-48 bg-gray-100">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.nombre}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
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
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            {product.category && (
              <p className="text-xs text-blue-600 font-medium mb-1">
                {product.category.name}
              </p>
            )}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.nombre}
            </h3>
            {product.descripcion && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.descripcion}
              </p>
            )}
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-gray-900">
              ${Number(product.precio).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
