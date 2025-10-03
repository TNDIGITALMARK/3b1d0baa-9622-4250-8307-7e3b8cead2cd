'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown
} from 'lucide-react';
import { products, categories, getProductsByCategory } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

export default function ProductsPage() {
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  // Filter and sort products
  const filteredProducts = getProductsByCategory(selectedCategory)
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
        default:
          return a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1;
      }
    });

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl lg:text-5xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-electric-blue to-hot-pink bg-clip-text text-transparent'>
              All Products
            </span>
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Discover our complete collection of trendy collectibles, Labubus, and cool knick knacks
          </p>
        </div>

        {/* Search and Filters */}
        <Card className='border-0 shadow-lg mb-8'>
          <CardContent className='p-6'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 items-center'>
              {/* Search */}
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className='h-4 w-4 mr-2' />
                  <SelectValue placeholder='Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <ArrowUpDown className='h-4 w-4 mr-2' />
                  <SelectValue placeholder='Sort by' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='featured'>Featured</SelectItem>
                  <SelectItem value='newest'>Newest First</SelectItem>
                  <SelectItem value='price-low'>Price: Low to High</SelectItem>
                  <SelectItem value='price-high'>Price: High to Low</SelectItem>
                  <SelectItem value='name'>Name: A to Z</SelectItem>
                  <SelectItem value='rating'>Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className='flex items-center gap-2 justify-end'>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'h-9 w-9 p-0',
                    viewMode === 'grid' && 'bg-gradient-to-r from-electric-blue to-hot-pink'
                  )}
                >
                  <Grid3X3 className='h-4 w-4' />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'h-9 w-9 p-0',
                    viewMode === 'list' && 'bg-gradient-to-r from-electric-blue to-hot-pink'
                  )}
                >
                  <List className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Tags */}
        <div className='flex flex-wrap gap-2 mb-8 justify-center'>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'rounded-full transition-all duration-200',
                selectedCategory === category
                  ? 'bg-gradient-to-r from-electric-blue to-hot-pink text-white'
                  : 'hover:border-primary hover:text-primary'
              )}
            >
              {category}
              {category !== 'All' && (
                <Badge className='ml-2 bg-gray-200 text-gray-700 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs'>
                  {getProductsByCategory(category).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Results Info */}
        <div className='flex items-center justify-between mb-6'>
          <p className='text-gray-600'>
            Showing {filteredProducts.length} of {products.length} products
            {searchQuery && (
              <span> for "{searchQuery}"</span>
            )}
          </p>

          {searchQuery && (
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setSearchQuery('')}
              className='text-gray-500 hover:text-gray-700'
            >
              Clear search
            </Button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={cn(
            'grid gap-6 mb-12',
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 max-w-4xl mx-auto'
          )}>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                className={cn(
                  'animate-fade-in',
                  viewMode === 'list' && 'flex-row'
                )}
                style={{ animationDelay: `${index * 0.05}s` } as React.CSSProperties}
              />
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <div className='w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Search className='h-12 w-12 text-gray-300' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>No products found</h3>
            <p className='text-gray-600 mb-8'>
              {searchQuery
                ? `No products match "${searchQuery}". Try adjusting your search or filters.`
                : 'No products found in this category.'}
            </p>
            <div className='flex gap-4 justify-center'>
              {searchQuery && (
                <Button
                  onClick={() => setSearchQuery('')}
                  className='bg-gradient-to-r from-electric-blue to-hot-pink text-white'
                >
                  Clear Search
                </Button>
              )}
              <Button
                variant='outline'
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                View All Products
              </Button>
            </div>
          </div>
        )}

        {/* Load More Button (if needed) */}
        {filteredProducts.length > 12 && (
          <div className='text-center'>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105'
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}