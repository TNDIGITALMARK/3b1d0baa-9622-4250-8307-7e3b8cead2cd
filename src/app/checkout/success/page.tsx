'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Sparkles,
  Mail,
  Truck,
  Home,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CheckoutSuccessPage() {
  const [orderNumber] = useState(() =>
    Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-2xl mx-auto'>
          {/* Success Animation */}
          <div className={cn(
            'text-center mb-8 transition-all duration-1000 transform',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}>
            <div className='relative mb-6'>
              <div className='w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce-in'>
                <CheckCircle className='h-16 w-16 text-white' />
              </div>
              <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-electric-blue to-hot-pink rounded-full flex items-center justify-center animate-pulse'>
                <Sparkles className='h-4 w-4 text-white' />
              </div>
            </div>

            <h1 className='text-4xl lg:text-5xl font-bold mb-4'>
              <span className='text-gray-900'>Order </span>
              <span className='bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent'>
                Confirmed!
              </span>
            </h1>

            <p className='text-xl text-gray-600 mb-2'>
              Thank you for shopping with Trendy Things!
            </p>
            <p className='text-gray-500'>
              Your trendy collectibles are on their way to you.
            </p>
          </div>

          {/* Order Details */}
          <Card className={cn(
            'border-0 shadow-lg mb-8 transition-all duration-1000 delay-300 transform',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}>
            <CardContent className='p-8'>
              <div className='text-center mb-6'>
                <Badge className='bg-gradient-to-r from-electric-blue to-hot-pink text-white px-4 py-2 text-sm font-semibold rounded-full'>
                  Order #{orderNumber}
                </Badge>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
                <div className='space-y-3'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto'>
                    <Mail className='h-6 w-6 text-blue-600' />
                  </div>
                  <h3 className='font-semibold text-gray-900'>Confirmation Sent</h3>
                  <p className='text-sm text-gray-600'>
                    Order confirmation and tracking details sent to your email
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto'>
                    <Truck className='h-6 w-6 text-purple-600' />
                  </div>
                  <h3 className='font-semibold text-gray-900'>Fast Shipping</h3>
                  <p className='text-sm text-gray-600'>
                    Your order will be processed and shipped within 1-2 business days
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto'>
                    <Sparkles className='h-6 w-6 text-pink-600' />
                  </div>
                  <h3 className='font-semibold text-gray-900'>Premium Quality</h3>
                  <p className='text-sm text-gray-600'>
                    All items are authentic and carefully packaged for protection
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className={cn(
            'border-0 shadow-lg mb-8 transition-all duration-1000 delay-500 transform',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}>
            <CardContent className='p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4 text-center'>
                What happens next?
              </h2>

              <div className='space-y-4'>
                <div className='flex items-start gap-4'>
                  <div className='w-6 h-6 bg-gradient-to-br from-electric-blue to-hot-pink rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-xs font-bold'>1</span>
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-900'>Order Processing</h3>
                    <p className='text-sm text-gray-600'>
                      We'll prepare your items with care and attention to detail
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-6 h-6 bg-gradient-to-br from-electric-blue to-hot-pink rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-xs font-bold'>2</span>
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-900'>Shipping Notification</h3>
                    <p className='text-sm text-gray-600'>
                      You'll receive tracking information via email once shipped
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-6 h-6 bg-gradient-to-br from-electric-blue to-hot-pink rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-xs font-bold'>3</span>
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-900'>Delivery</h3>
                    <p className='text-sm text-gray-600'>
                      Enjoy your new trendy collectibles in 3-7 business days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className={cn(
            'flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 transform',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}>
            <Link href='/'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-electric-blue to-hot-pink hover:from-hot-pink hover:to-electric-blue text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105'
              >
                <Home className='mr-2 h-5 w-5' />
                Back to Home
              </Button>
            </Link>

            <Link href='/products'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105'
              >
                Continue Shopping
              </Button>
            </Link>

            <Button
              size='lg'
              variant='ghost'
              className='text-gray-600 hover:text-primary px-8 py-4 rounded-full'
            >
              <Share2 className='mr-2 h-5 w-5' />
              Share
            </Button>
          </div>

          {/* Social Proof */}
          <div className={cn(
            'text-center mt-12 transition-all duration-1000 delay-900 transform',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}>
            <p className='text-gray-500 mb-4'>Join thousands of happy collectors!</p>
            <div className='flex items-center justify-center gap-8 text-sm text-gray-400'>
              <div className='text-center'>
                <div className='font-bold text-gray-900'>10,000+</div>
                <div>Happy Customers</div>
              </div>
              <div className='text-center'>
                <div className='font-bold text-gray-900'>50+</div>
                <div>Countries</div>
              </div>
              <div className='text-center'>
                <div className='font-bold text-gray-900'>4.9★</div>
                <div>Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}