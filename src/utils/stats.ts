/**
 * Generates deterministic realistic stats based on a string ID or title.
 * This ensures consistency for the same product across different views.
 */
export const getProductStats = (id: string, title?: string) => {
  const source = id || title || 'fallback';
  const seed = source.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const discounts = [5, 8, 10, 13, 15, 20, 25, 30];
  const orderCounts = ['50+', '100+', '200+', '300+', '500+', '1K+', '2K+'];
  
  const lowerTitle = title?.toLowerCase() || '';
  const isIPhone = lowerTitle.startsWith('iphone') || lowerTitle.startsWith('apple iphone');
  const hasDiscount = isIPhone ? false : (seed % 3) !== 0; // 66% chance of having a discount, except for iPhones
  const discount = discounts[seed % discounts.length];
  const orderCount = orderCounts[seed % orderCounts.length];
  const isLimitedTime = isIPhone ? false : (seed % 2) === 0;
  
  return {
    hasDiscount,
    discount,
    orderCount,
    isLimitedTime
  };
};
