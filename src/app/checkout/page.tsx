'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Truck,
  CheckCircle,
  Sparkles,
  Lock
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States'
  });

  const shipping = state.total >= 50 ? 0 : 9.99;
  const tax = state.total * 0.08;
  const finalTotal = state.total + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 2000);
  };

  if (state.items.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30'>
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-md mx-auto text-center'>
            <div className='mb-8'>
              <div className='w-24 h-24 bg-gradient-to-br from-electric-blue/10 to-hot-pink/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                <CreditCard className='h-12 w-12 text-gray-300' />
              </div>
              <h1 className='text-2xl font-bold text-gray-900 mb-2'>No Items to Checkout</h1>
              <p className='text-gray-600 mb-8'>
                Your cart is empty. Add some trendy items before proceeding to checkout.
              </p>
            </div>

            <Link href='/products'>
              <Button
                size='lg'
                className='w-full bg-gradient-to-r from-electric-blue to-hot-pink hover:from-hot-pink hover:to-electric-blue text-white font-semibold rounded-full'
              >
                Start Shopping
              </Button>
            </Link>
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
          <Link
            href='/cart'
            className='inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200 mb-4'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Cart
          </Link>

          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-bold text-gray-900'>Checkout</h1>
            <Badge className='bg-gradient-to-r from-electric-blue to-hot-pink text-white px-3 py-1 rounded-full'>
              {state.itemCount} items
            </Badge>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Checkout Form */}
          <div className='space-y-6'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Contact Information */}
              <Card className='border-0 shadow-md'>
                <CardHeader>
                  <CardTitle className='text-xl font-semibold text-gray-900'>
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <Label htmlFor='email'>Email Address</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className='mt-1'
                      placeholder='trendy@example.com'
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className='border-0 shadow-md'>
                <CardHeader>
                  <CardTitle className='text-xl font-semibold text-gray-900'>
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='firstName'>First Name</Label>
                      <Input
                        id='firstName'
                        name='firstName'
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className='mt-1'
                      />
                    </div>
                    <div>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <Input
                        id='lastName'
                        name='lastName'
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className='mt-1'
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor='address'>Street Address</Label>
                    <Input
                      id='address'
                      name='address'
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className='mt-1'
                      placeholder='123 Trendy Street'
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='city'>City</Label>
                      <Input
                        id='city'
                        name='city'
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className='mt-1'
                      />
                    </div>
                    <div>
                      <Label htmlFor='postalCode'>Postal Code</Label>
                      <Input
                        id='postalCode'
                        name='postalCode'
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className='mt-1'
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className='border-0 shadow-md'>
                <CardHeader>
                  <CardTitle className='text-xl font-semibold text-gray-900'>
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className='flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50'>
                      <RadioGroupItem value='card' id='card' />
                      <Label htmlFor='card' className='flex items-center gap-2 cursor-pointer'>
                        <CreditCard className='h-4 w-4' />
                        Credit Card
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className='space-y-4 pt-4 border-t'>
                      <div>
                        <Label htmlFor='cardNumber'>Card Number</Label>
                        <Input
                          id='cardNumber'
                          placeholder='1234 5678 9012 3456'
                          className='mt-1'
                          disabled={isProcessing}
                        />
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <Label htmlFor='expiry'>Expiry Date</Label>
                          <Input
                            id='expiry'
                            placeholder='MM/YY'
                            className='mt-1'
                            disabled={isProcessing}
                          />
                        </div>
                        <div>
                          <Label htmlFor='cvc'>CVC</Label>
                          <Input
                            id='cvc'
                            placeholder='123'
                            className='mt-1'
                            disabled={isProcessing}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type='submit'
                size='lg'
                className={cn(
                  'w-full bg-gradient-to-r from-electric-blue to-hot-pink hover:from-hot-pink hover:to-electric-blue',
                  'text-white font-semibold rounded-full transition-all duration-300',
                  isProcessing ? 'animate-pulse' : 'hover:scale-105'
                )}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    Processing...
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <Lock className='h-4 w-4' />
                    Complete Order - ${finalTotal.toFixed(2)}
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className='space-y-6'>
            {/* Items Preview */}
            <Card className='border-0 shadow-lg'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold text-gray-900'>
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {state.items.map((item) => (
                  <div key={item.id} className='flex items-center gap-4'>
                    <div className='relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50'>
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className='object-cover'
                      />
                      <Badge className='absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-electric-blue text-white text-xs'>
                        {item.quantity}
                      </Badge>
                    </div>

                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium text-gray-900 text-sm line-clamp-2'>
                        {item.product.name}
                      </h3>
                      <p className='text-xs text-gray-500'>{item.product.category}</p>
                    </div>

                    <div className='text-right'>
                      <p className='font-semibold text-gray-900'>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : 'text-gray-900'}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className='flex justify-between text-lg font-bold'>
                    <span>Total</span>
                    <span className='text-primary'>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className='border-0 shadow-md bg-gradient-to-br from-green-50 to-white'>
              <CardContent className='p-4 space-y-3'>
                <div className='flex items-center gap-3'>
                  <Shield className='h-5 w-5 text-green-600' />
                  <div>
                    <p className='text-sm font-medium text-gray-900'>Secure Checkout</p>
                    <p className='text-xs text-gray-500'>SSL encrypted transaction</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Truck className='h-5 w-5 text-blue-600' />
                  <div>
                    <p className='text-sm font-medium text-gray-900'>Fast Delivery</p>
                    <p className='text-xs text-gray-500'>3-7 business days worldwide</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Sparkles className='h-5 w-5 text-purple-600' />
                  <div>
                    <p className='text-sm font-medium text-gray-900'>Authentic Products</p>
                    <p className='text-xs text-gray-500'>100% genuine collectibles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}