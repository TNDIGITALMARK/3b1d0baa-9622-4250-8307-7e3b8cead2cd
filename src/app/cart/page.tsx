'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Shield,
  Truck
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const shipping = state.total >= 50 ? 0 : 9.99;
  const tax = state.total * 0.08;
  const finalTotal = state.total + shipping + tax;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30'>
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-md mx-auto text-center'>
            <div className='mb-8'>
              <div className='w-24 h-24 bg-gradient-to-br from-electric-blue/10 to-hot-pink/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                <ShoppingCart className='h-12 w-12 text-gray-300' />
              </div>
              <h1 className='text-2xl font-bold text-gray-900 mb-2'>Your Cart is Empty</h1>
              <p className='text-gray-600 mb-8'>
                Looks like you haven't added any trendy items to your cart yet!
              </p>
            </div>

            <div className='space-y-3'>
              <Link href='/products'>
                <Button
                  size='lg'
                  className='w-full bg-gradient-to-r from-electric-blue to-hot-pink hover:from-hot-pink hover:to-electric-blue text-white font-semibold rounded-full'
                >
                  Start Shopping
                </Button>
              </Link>

              <Link href='/collections/labubu'>
                <Button
                  size='lg'
                  variant='outline'
                  className='w-full border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full'
                >
                  Explore Labubu Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-4'>
            <Link
              href='/products'
              className='inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200'
            >
              <ArrowLeft className='h-4 w-4' />
              Continue Shopping
            </Link>

            <Button
              variant='ghost'
              onClick={clearCart}
              className='text-red-600 hover:text-red-700 hover:bg-red-50'
            >
              <Trash2 className='h-4 w-4 mr-2' />
              Clear Cart
            </Button>
          </div>

          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-bold text-gray-900'>Shopping Cart</h1>
            <Badge className='bg-gradient-to-r from-electric-blue to-hot-pink text-white px-3 py-1 rounded-full'>
              {state.itemCount} items
            </Badge>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-4'>
            {state.items.map((item, index) => (
              <Card key={item.id} className='overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300'>
                <CardContent className='p-6'>
                  <div className='flex items-start gap-4'>
                    {/* Product Image */}
                    <div className='flex-shrink-0'>
                      <Link href={`/products/${item.id}`}>
                        <div className='w-24 h-24 rounded-xl overflow-hidden bg-gray-50 hover:scale-105 transition-transform duration-200'>
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={96}
                            height={96}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between mb-2'>
                        <div>
                          <Link
                            href={`/products/${item.id}`}
                            className='font-semibold text-gray-900 hover:text-primary transition-colors duration-200 line-clamp-2'
                          >
                            {item.product.name}
                          </Link>
                          <p className='text-sm text-gray-500 mt-1'>
                            Category: {item.product.category}
                          </p>
                        </div>

                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0'
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>

                      {/* Price and Quantity */}
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <span className='font-bold text-lg text-gray-900'>
                            ${item.product.price}
                          </span>
                          {item.product.originalPrice && (
                            <span className='text-sm text-gray-500 line-through'>
                              ${item.product.originalPrice}
                            </span>
                          )}
                        </div>

                        <div className='flex items-center gap-3'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='h-8 w-8 p-0 rounded-full'
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className='h-3 w-3' />
                          </Button>

                          <span className='font-medium text-gray-900 w-8 text-center'>
                            {item.quantity}
                          </span>

                          <Button
                            variant='outline'
                            size='sm'
                            className='h-8 w-8 p-0 rounded-full'
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className='h-3 w-3' />
                          </Button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className='mt-3 pt-3 border-t border-gray-100'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-gray-600'>Item total:</span>
                          <span className='font-semibold text-gray-900'>
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className='space-y-6'>
            {/* Summary Card */}
            <Card className='border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50'>
              <CardHeader>
                <CardTitle className='text-xl font-bold text-gray-900'>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal ({state.itemCount} items)</span>
                  <span className='font-medium'>${state.total.toFixed(2)}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Shipping</span>
                  <span className={cn(
                    'font-medium',
                    shipping === 0 ? 'text-green-600' : 'text-gray-900'
                  )}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className='text-xs text-gray-500 bg-blue-50 p-2 rounded-lg'>
                    <Truck className='h-3 w-3 inline mr-1' />
                    Add ${(50 - state.total).toFixed(2)} more for free shipping
                  </div>
                )}

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Tax</span>
                  <span className='font-medium'>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className='flex justify-between text-lg font-bold'>
                  <span>Total</span>
                  <span className='text-primary'>${finalTotal.toFixed(2)}</span>
                </div>

                <div className='space-y-3 pt-4'>
                  <Link href='/checkout'>
                    <Button
                      size='lg'
                      className='w-full bg-gradient-to-r from-electric-blue to-hot-pink hover:from-hot-pink hover:to-electric-blue text-white font-semibold rounded-full transition-all duration-300 hover:scale-105'
                    >
                      Proceed to Checkout
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </Button>
                  </Link>

                  <Link href='/products'>
                    <Button
                      variant='outline'
                      size='lg'
                      className='w-full border-2 border-gray-200 hover:border-primary hover:text-primary rounded-full'
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className='border-0 shadow-md'>
              <CardContent className='p-4 space-y-3'>
                <div className='flex items-center gap-3'>
                  <Shield className='h-5 w-5 text-green-600' />
                  <span className='text-sm font-medium text-gray-900'>Secure Checkout</span>
                </div>

                <div className='flex items-center gap-3'>
                  <Truck className='h-5 w-5 text-blue-600' />
                  <span className='text-sm font-medium text-gray-900'>Fast & Free Shipping</span>
                </div>

                <div className='flex items-center gap-3'>
                  <Sparkles className='h-5 w-5 text-purple-600' />
                  <span className='text-sm font-medium text-gray-900'>Authentic Products</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}