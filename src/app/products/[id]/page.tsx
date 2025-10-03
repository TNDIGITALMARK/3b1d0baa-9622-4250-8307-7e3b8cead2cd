'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
  Zoom
} from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ id: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addItem, getItemQuantity } = useCart();

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const product = products.find(p => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const cartQuantity = getItemQuantity(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30'>
      <div className='container mx-auto px-4 py-8'>
        {/* Back Navigation */}
        <div className='mb-6'>
          <Link
            href='/products'
            className='inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Products
          </Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Product Images */}
          <div className='space-y-4'>
            {/* Main Image */}
            <div className='relative aspect-square overflow-hidden rounded-2xl bg-white border shadow-lg group'>
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className={cn(
                  'object-cover transition-transform duration-300',
                  isZoomed ? 'scale-150' : 'group-hover:scale-105'
                )}
              />

              {/* Zoom Button */}
              <Button
                variant='ghost'
                size='sm'
                className='absolute top-4 right-4 h-10 w-10 p-0 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white'
                onClick={handleImageClick}
              >
                <Zoom className='h-4 w-4' />
              </Button>

              {/* Badges */}
              <div className='absolute top-4 left-4 flex flex-col gap-2'>
                {product.isNew && (
                  <Badge className='bg-gradient-to-r from-electric-blue to-hot-pink text-white font-semibold px-3 py-1 rounded-full'>
                    NEW
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className='bg-red-500 text-white font-semibold px-3 py-1 rounded-full'>
                    -{discount}% OFF
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge className='bg-gray-500 text-white font-semibold px-3 py-1 rounded-full'>
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className='flex gap-2 overflow-x-auto pb-2'>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200',
                      selectedImageIndex === index
                        ? 'border-primary shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className='w-full h-full object-cover'
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            {/* Product Title & Rating */}
            <div className='space-y-4'>
              <div className='flex items-start justify-between'>
                <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 leading-tight'>
                  {product.name}
                </h1>

                <Button
                  variant='ghost'
                  size='sm'
                  className={cn(
                    'h-10 w-10 p-0 rounded-full transition-all duration-200',
                    isWishlisted
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 hover:text-red-500'
                  )}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
                </Button>
              </div>

              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'h-4 w-4',
                        star <= Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      )}
                    />
                  ))}
                </div>
                <span className='text-sm text-gray-600'>
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className='flex items-center gap-3'>
              <span className='text-3xl font-bold text-gray-900'>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className='text-xl text-gray-500 line-through'>
                  ${product.originalPrice}
                </span>
              )}
              {discount > 0 && (
                <Badge className='bg-red-500 text-white font-semibold px-2 py-1 rounded-full text-sm'>
                  Save ${(product.originalPrice! - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold text-gray-900'>Description</h3>
              <p className='text-gray-600 leading-relaxed'>{product.description}</p>
            </div>

            {/* Tags */}
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold text-gray-900'>Tags</h3>
              <div className='flex flex-wrap gap-2'>
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant='outline'
                    className='px-3 py-1 rounded-full text-sm'
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Quantity & Add to Cart */}
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <span className='text-sm font-medium text-gray-900'>Quantity:</span>
                <div className='flex items-center gap-3'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='h-10 w-10 p-0 rounded-full'
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <span className='text-lg font-medium w-12 text-center'>
                    {quantity}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    className='h-10 w-10 p-0 rounded-full'
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
                {cartQuantity > 0 && (
                  <span className='text-sm text-gray-500'>
                    ({cartQuantity} in cart)
                  </span>
                )}
              </div>

              <div className='flex gap-4'>
                <Button
                  size='lg'
                  className={cn(
                    'flex-1 bg-gradient-to-r from-electric-blue to-hot-pink hover:from-hot-pink hover:to-electric-blue',
                    'text-white font-semibold rounded-full transition-all duration-300 hover:scale-105',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                  )}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className='h-5 w-5 mr-2' />
                  {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>

                <Button
                  variant='outline'
                  size='lg'
                  className='rounded-full'
                >
                  <Share2 className='h-5 w-5' />
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <Card className='border-blue-100 bg-gradient-to-br from-blue-50 to-white'>
                <CardContent className='p-4 text-center'>
                  <Truck className='h-6 w-6 text-blue-600 mx-auto mb-2' />
                  <p className='text-sm font-medium text-gray-900'>Free Shipping</p>
                  <p className='text-xs text-gray-600'>On orders over $50</p>
                </CardContent>
              </Card>

              <Card className='border-green-100 bg-gradient-to-br from-green-50 to-white'>
                <CardContent className='p-4 text-center'>
                  <Shield className='h-6 w-6 text-green-600 mx-auto mb-2' />
                  <p className='text-sm font-medium text-gray-900'>Authentic</p>
                  <p className='text-xs text-gray-600'>100% genuine</p>
                </CardContent>
              </Card>

              <Card className='border-purple-100 bg-gradient-to-br from-purple-50 to-white'>
                <CardContent className='p-4 text-center'>
                  <RotateCcw className='h-6 w-6 text-purple-600 mx-auto mb-2' />
                  <p className='text-sm font-medium text-gray-900'>Easy Returns</p>
                  <p className='text-xs text-gray-600'>30-day policy</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}