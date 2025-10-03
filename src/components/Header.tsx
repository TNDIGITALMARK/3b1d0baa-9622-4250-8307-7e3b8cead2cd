'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  ShoppingCart,
  Menu,
  Search,
  Heart,
  User,
  X
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Labubu Collection', href: '/collections/labubu' },
  { name: 'New Arrivals', href: '/collections/new' },
  { name: 'Sale', href: '/collections/sale' }
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { state } = useCart();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <Image
              src='/generated/trendy-things-logo.png'
              alt='Trendy Things'
              width={40}
              height={40}
              className='w-10 h-10'
            />
            <span className='font-bold text-xl bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent'>
              Trendy Things
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-gray-600 hover:text-primary transition-colors duration-200 font-medium relative group'
              >
                {item.name}
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-electric-blue to-hot-pink transition-all duration-300 group-hover:w-full' />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className='flex items-center space-x-4'>
            {/* Search */}
            <Button
              variant='ghost'
              size='sm'
              className='hidden sm:flex h-9 w-9 p-0 rounded-full hover:bg-gray-100'
            >
              <Search className='h-4 w-4' />
            </Button>

            {/* Wishlist */}
            <Button
              variant='ghost'
              size='sm'
              className='hidden sm:flex h-9 w-9 p-0 rounded-full hover:bg-gray-100 relative'
            >
              <Heart className='h-4 w-4' />
              <Badge className='absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-hot-pink text-white text-xs'>
                0
              </Badge>
            </Button>

            {/* Cart */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-9 w-9 p-0 rounded-full hover:bg-gray-100 relative'
                >
                  <ShoppingCart className='h-4 w-4' />
                  {state.itemCount > 0 && (
                    <Badge className='absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-electric-blue text-white text-xs animate-bounce'>
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className='w-full sm:w-96'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-lg font-semibold'>Shopping Cart</h2>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setCartOpen(false)}
                    className='h-8 w-8 p-0'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>

                {state.items.length === 0 ? (
                  <div className='flex flex-col items-center justify-center h-64 text-center'>
                    <ShoppingCart className='h-12 w-12 text-gray-300 mb-4' />
                    <p className='text-gray-500 mb-4'>Your cart is empty</p>
                    <Button
                      onClick={() => setCartOpen(false)}
                      className='bg-gradient-to-r from-electric-blue to-hot-pink text-white'
                    >
                      <Link href='/products'>Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {state.items.map((item) => (
                      <div key={item.id} className='flex items-center gap-4 p-3 border rounded-lg'>
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={60}
                          height={60}
                          className='rounded-md'
                        />
                        <div className='flex-1'>
                          <h3 className='font-medium text-sm'>{item.product.name}</h3>
                          <p className='text-xs text-gray-500'>Qty: {item.quantity}</p>
                          <p className='font-semibold text-primary'>${item.product.price}</p>
                        </div>
                      </div>
                    ))}

                    <div className='border-t pt-4'>
                      <div className='flex justify-between items-center mb-4'>
                        <span className='font-semibold'>Total:</span>
                        <span className='font-bold text-lg'>${state.total.toFixed(2)}</span>
                      </div>

                      <div className='space-y-2'>
                        <Button
                          className='w-full bg-gradient-to-r from-electric-blue to-hot-pink text-white'
                          onClick={() => setCartOpen(false)}
                        >
                          <Link href='/cart' className='w-full'>
                            View Cart
                          </Link>
                        </Button>
                        <Button
                          className='w-full bg-gradient-to-r from-hot-pink to-purple-gradient text-white'
                          onClick={() => setCartOpen(false)}
                        >
                          <Link href='/checkout' className='w-full'>
                            Checkout
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {/* User Account */}
            <Button
              variant='ghost'
              size='sm'
              className='hidden sm:flex h-9 w-9 p-0 rounded-full hover:bg-gray-100'
            >
              <User className='h-4 w-4' />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='md:hidden h-9 w-9 p-0'
                >
                  <Menu className='h-4 w-4' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left'>
                <div className='flex items-center space-x-2 mb-8'>
                  <Image
                    src='/generated/trendy-things-logo.png'
                    alt='Trendy Things'
                    width={32}
                    height={32}
                    className='w-8 h-8'
                  />
                  <span className='font-bold text-lg bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent'>
                    Trendy Things
                  </span>
                </div>

                <nav className='space-y-4'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='block text-gray-600 hover:text-primary transition-colors duration-200 font-medium py-2'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className='border-t pt-4 space-y-2'>
                    <Button variant='ghost' className='w-full justify-start'>
                      <Search className='h-4 w-4 mr-2' />
                      Search
                    </Button>
                    <Button variant='ghost' className='w-full justify-start'>
                      <Heart className='h-4 w-4 mr-2' />
                      Wishlist
                    </Button>
                    <Button variant='ghost' className='w-full justify-start'>
                      <User className='h-4 w-4 mr-2' />
                      Account
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}