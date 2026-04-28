/**
 * Generates deterministic realistic stats based on a string ID or title.
 * This ensures consistency for the same product across different views.
 */
export const getProductStats = (id: string, title?: string) => {
  const source = id || title || 'fallback';
  const seed = source.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const discounts = [15, 20, 25, 29, 35, 42, 50];
  const orderCounts = ['50+', '100+', '200+', '300+', '500+', '1K+', '2K+'];
  
  const hasDiscount = (seed % 3) !== 0; // 66% chance of having a discount
  const discount = discounts[seed % discounts.length];
  const orderCount = orderCounts[seed % orderCounts.length];
  const isLimitedTime = (seed % 2) === 0;
  
  return {
    hasDiscount,
    discount,
    orderCount,
    isLimitedTime
  };
};
