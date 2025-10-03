'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50 min-h-[80vh] flex items-center'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ec4899" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] animate-pulse' />

      {/* Floating Elements */}
      <div className='absolute top-20 left-10 animate-float'>
        <div className='w-8 h-8 bg-gradient-to-br from-electric-blue to-hot-pink rounded-full opacity-20' />
      </div>
      <div className='absolute top-40 right-20 animate-float' style={{ animationDelay: '1s' }}>
        <div className='w-12 h-12 bg-gradient-to-br from-purple-gradient to-electric-blue rounded-full opacity-30' />
      </div>
      <div className='absolute bottom-20 left-20 animate-float' style={{ animationDelay: '2s' }}>
        <div className='w-6 h-6 bg-gradient-to-br from-hot-pink to-purple-gradient rounded-full opacity-25' />
      </div>

      <div className='container mx-auto px-4 py-16 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left Content */}
          <div className='space-y-8 animate-fade-in'>
            <div className='space-y-6'>
              <Badge className='bg-gradient-to-r from-electric-blue to-hot-pink text-white px-6 py-2 text-sm font-semibold rounded-full inline-flex items-center gap-2'>
                <Sparkles className='h-4 w-4' />
                New Collection Available
              </Badge>

              <div className='space-y-4'>
                <h1 className='text-4xl lg:text-6xl font-bold leading-tight'>
                  <span className='bg-gradient-to-r from-electric-blue via-purple-gradient to-hot-pink bg-clip-text text-transparent'>
                    Trendy Things
                  </span>
                  <br />
                  <span className='text-gray-900'>
                    for Cool People
                  </span>
                </h1>

                <p className='text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed'>
                  Discover a plethora of random knick knacks, Labubus, and other cool collectibles that define your unique style.
                </p>
              </div>

              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className='h-5 w-5 text-yellow-400 fill-current'
                    />
                  ))}
                </div>
                <span className='text-gray-600'>
                  Loved by 10,000+ collectors
                </span>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Link href='/products'>
                <Button
                  size='lg'
                  className='bg-gradient-to-r from-electric-blue to-hot-pink hover:from-hot-pink hover:to-electric-blue text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group'
                >
                  Shop Now
                  <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200' />
                </Button>
              </Link>

              <Link href='/collections/labubu'>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105'
                >
                  Explore Labubu
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className='flex items-center gap-8 pt-8 border-t border-gray-200'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>1000+</div>
                <div className='text-sm text-gray-600'>Products</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>10K+</div>
                <div className='text-sm text-gray-600'>Happy Customers</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>50+</div>
                <div className='text-sm text-gray-600'>Countries</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className='relative lg:h-[600px] animate-slide-up' style={{ animationDelay: '0.2s' }}>
            <div className='relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-electric-blue/10 to-hot-pink/10 backdrop-blur-sm'>
              {/* Placeholder for hero image - will be replaced with actual product showcase */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-80 h-80 bg-gradient-to-br from-electric-blue to-hot-pink rounded-full opacity-20 animate-pulse' />
              </div>

              {/* Featured Product Cards */}
              <div className='absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-bounce-in' style={{ animationDelay: '0.8s' }}>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-gradient-to-br from-electric-blue to-hot-pink rounded-xl flex items-center justify-center'>
                    <Sparkles className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <div className='font-semibold text-gray-900'>Labubu Series 8</div>
                    <div className='text-sm text-gray-600'>Most Popular</div>
                  </div>
                </div>
              </div>

              <div className='absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-bounce-in' style={{ animationDelay: '1.2s' }}>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-gradient-to-br from-hot-pink to-purple-gradient rounded-xl flex items-center justify-center'>
                    <Star className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <div className='font-semibold text-gray-900'>Limited Edition</div>
                    <div className='text-sm text-gray-600'>Golden Labubu</div>
                  </div>
                </div>
              </div>

              {/* Decorative Gradient Orbs */}
              <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-electric-blue/20 to-transparent rounded-full blur-xl animate-float' />
              <div className='absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-hot-pink/20 to-transparent rounded-full blur-xl animate-float' style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-electric-blue via-purple-gradient to-hot-pink opacity-10' />
    </div>
  );
}