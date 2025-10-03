'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
  className
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onAddToCart) {
      setIsAnimating(true);
      onAddToCart(product);

      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50 before:to-pink-50 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className='relative z-10'>
        <div className='relative aspect-square overflow-hidden rounded-t-xl'>
          <Image
            src={product.images[imageIndex]}
            alt={product.name}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-110'
          />

          {/* Badges */}
          <div className='absolute top-3 left-3 flex flex-col gap-2'>
            {product.isNew && (
              <Badge className='bg-gradient-to-r from-electric-blue to-hot-pink text-white font-semibold px-3 py-1 rounded-full animate-bounce'>
                NEW
              </Badge>
            )}
            {discount > 0 && (
              <Badge className='bg-red-500 text-white font-semibold px-3 py-1 rounded-full'>
                -{discount}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge className='bg-gray-500 text-white font-semibold px-3 py-1 rounded-full'>
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant='ghost'
            size='sm'
            className={cn(
              'absolute top-3 right-3 h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300',
              'opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110',
              isInWishlist && 'text-red-500'
            )}
            onClick={handleWishlistToggle}
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-all duration-200',
                isInWishlist && 'fill-current'
              )}
            />
          </Button>

          {/* Quick View */}
          <Button
            variant='ghost'
            size='sm'
            className={cn(
              'absolute bottom-3 right-3 h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300',
              'opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110'
            )}
          >
            <Eye className='h-4 w-4' />
          </Button>

          {/* Image Dots */}
          {product.images.length > 1 && (
            <div className='absolute bottom-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-200',
                    index === imageIndex
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/75'
                  )}
                  onMouseEnter={() => setImageIndex(index)}
                />
              ))}
            </div>
          )}

          {/* Hover Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />
        </div>

        <CardContent className='relative z-10 p-4 space-y-3'>
          {/* Rating */}
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'h-3 w-3',
                    star <= Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  )}
                />
              ))}
            </div>
            <span className='text-xs text-gray-500'>
              ({product.reviewCount})
            </span>
          </div>

          {/* Product Name */}
          <h3 className='font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors duration-200'>
            {product.name}
          </h3>

          {/* Price */}
          <div className='flex items-center gap-2'>
            <span className='text-lg font-bold text-gray-900'>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className='text-sm text-gray-500 line-through'>
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className={cn(
              'w-full bg-gradient-to-r from-electric-blue to-hot-pink hover:from-hot-pink hover:to-electric-blue',
              'text-white font-semibold rounded-full transition-all duration-300 hover:scale-105',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
              isAnimating && 'animate-pulse'
            )}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className='h-4 w-4 mr-2' />
            {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}