'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from '@/components/HeroSection';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, TrendingUp, Award, ShoppingBag } from 'lucide-react';
import { getFeaturedProducts, getNewProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const { addItem } = useCart();
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <Badge className='bg-gradient-to-r from-electric-blue to-hot-pink text-white px-6 py-2 text-sm font-semibold rounded-full inline-flex items-center gap-2 mb-4'>
              <Sparkles className='h-4 w-4' />
              Featured Collection
            </Badge>
            <h2 className='text-3xl lg:text-4xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent'>
                Trending Now
              </span>
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
              Discover the most popular items that are flying off our shelves
            </p>
          </div>

          {/* Lifestyle Banner */}
          <div className='relative mb-12 rounded-2xl overflow-hidden'>
            <div className='relative h-48 md:h-64'>
              <Image
                src='/generated/collectibles-lifestyle.png'
                alt='Collector lifestyle showcase - stylish collectibles display'
                fill
                className='object-cover object-center'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center text-white'>
                  <h3 className='text-2xl md:text-3xl font-bold mb-2'>Curate Your Collection</h3>
                  <p className='text-blue-100 text-sm md:text-base'>Join collectors worldwide showcasing their passion</p>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                className='animate-fade-in'
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              />
            ))}
          </div>

          <div className='text-center'>
            <Link href='/products'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-electric-blue to-hot-pink hover:from-hot-pink hover:to-electric-blue text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 group'
              >
                View All Products
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200' />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className='py-16 bg-gradient-to-br from-blue-50 via-white to-pink-50'>
        <div className='container mx-auto px-4'>
          {/* New Arrivals Banner */}
          <div className='relative mb-12 rounded-3xl overflow-hidden'>
            <div className='relative h-64 md:h-80'>
              <Image
                src='/generated/new-arrivals-banner.png'
                alt='New Arrivals - Latest trendy collectibles just dropped'
                fill
                className='object-cover object-center'
              />
            </div>
          </div>

          <div className='text-center mb-12'>
            <Badge className='bg-gradient-to-r from-purple-gradient to-hot-pink text-white px-6 py-2 text-sm font-semibold rounded-full inline-flex items-center gap-2 mb-4'>
              <TrendingUp className='h-4 w-4' />
              Just Dropped
            </Badge>
            <h2 className='text-3xl lg:text-4xl font-bold mb-4'>
              <span className='text-gray-900'>New </span>
              <span className='bg-gradient-to-r from-purple-gradient to-hot-pink bg-clip-text text-transparent'>
                Arrivals
              </span>
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
              Be the first to get your hands on the latest trendy collectibles
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
            {newProducts.slice(0, 3).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                className='animate-slide-up'
                style={{ animationDelay: `${index * 0.15}s` } as React.CSSProperties}
              />
            ))}
          </div>

          <div className='text-center'>
            <Link href='/collections/new'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105'
              >
                Explore New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl lg:text-4xl font-bold mb-4'>
              Why Choose <span className='bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent'>Trendy Things</span>?
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
              We are more than just a store - we are your gateway to the coolest collectibles
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2'>
              <div className='relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden'>
                <Image
                  src='/generated/authentic-products.png'
                  alt='Authentic collectible products with certification'
                  fill
                  className='object-cover object-center'
                />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Authentic Products</h3>
              <p className='text-gray-600'>
                100% authentic collectibles sourced directly from official distributors
              </p>
            </div>

            <div className='text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-white border border-pink-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2'>
              <div className='relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden'>
                <Image
                  src='/generated/fast-shipping.png'
                  alt='Fast worldwide shipping and delivery'
                  fill
                  className='object-cover object-center'
                />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Fast Shipping</h3>
              <p className='text-gray-600'>
                Free worldwide shipping on orders over $50. Get your items in 3-7 days
              </p>
            </div>

            <div className='text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2'>
              <div className='relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden'>
                <Image
                  src='/generated/exclusive-drops.png'
                  alt='Exclusive limited edition collectibles'
                  fill
                  className='object-cover object-center'
                />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Exclusive Drops</h3>
              <p className='text-gray-600'>
                Be first to access limited edition releases and exclusive collaborations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-gradient-to-r from-electric-blue via-purple-gradient to-hot-pink'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl lg:text-4xl font-bold text-white mb-4'>
            Ready to Start Your Collection?
          </h2>
          <p className='text-blue-100 text-lg mb-8 max-w-2xl mx-auto'>
            Join thousands of collectors who trust Trendy Things for their coolest finds
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/products'>
              <Button
                size='lg'
                className='bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105'
              >
                Browse Products
              </Button>
            </Link>

            <Link href='/collections/labubu'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105'
              >
                Explore Labubu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}