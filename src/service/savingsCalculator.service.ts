import type { SavingsProduct, SavingsProductsFilter } from 'types/savingsProducts';

const INITIAL_MONTHLY_AMOUNT = 0;
const INITIAL_TERM = 12;

const isInitialFilter = (filter: SavingsProductsFilter): boolean => {
  return filter.monthlyAmount === INITIAL_MONTHLY_AMOUNT && filter.term === INITIAL_TERM;
};

const monthlyAmountFilter = (filter: SavingsProductsFilter, product: SavingsProduct) => {
  return filter.monthlyAmount >= product.minMonthlyAmount && filter.monthlyAmount <= product.maxMonthlyAmount;
};

const availableTermsFilter = (filter: SavingsProductsFilter, product: SavingsProduct) => {
  return product.availableTerms === filter.term;
};

export const filterSavingsProducts = (filter: SavingsProductsFilter, products: SavingsProduct[]): SavingsProduct[] => {
  // 초기값일 때는 전체 목록 반환
  if (isInitialFilter(filter)) {
    return products;
  }

  return products.filter(product => {
    const monthlyAmountMatch = filter.monthlyAmount === INITIAL_MONTHLY_AMOUNT || monthlyAmountFilter(filter, product);
    const termMatch = availableTermsFilter(filter, product);
    return monthlyAmountMatch && termMatch;
  });
};

/**
 *  예상 수익 금액 = 월 납입액 * 저축 기간 * (1 + 연이자율 * 0.5)

 * @param monthlyAmount 
 * @param term 
 * @param annualRate 
 * @returns 
 */
export const calculateExpectedEarnings = (monthlyAmount: number, term: number, annualRate: number): number => {
  const totalPrincipal = monthlyAmount * term;
  const interest = totalPrincipal * (1 + (Number(annualRate) / 100) * 0.5);

  return Math.floor(interest);
};

export const calcDiffBetweenGoalAndEarnings = (goalPrice: number, expectedEarnings: number): number => {
  return expectedEarnings - goalPrice;
};

/**
 * 추천 월 납입 금액
 * 공식: 월 납입액 = 목표 금액 ÷ (저축 기간 * (1 + 연이자율 * 0.5))
 * 1000원 단위로 반올림
 * @param goalPrice
 * @param term
 * @param annualRate
 * @returns
 */
export const calcRecommendMonthlyAmount = (goalPrice: number, term: number, annualRate: number): number => {
  if (term === 0) {
    return 0;
  }

  const recommendedAmount = goalPrice / (term * (1 + (Number(annualRate) / 100) * 0.5));
  return Math.ceil(recommendedAmount / 1000) * 1000;
};

/**
 * 적금 상품을 이자율 높은 순서로 정렬
 * @param products 정렬할 상품 목록
 * @returns 이자율이 높은 순서로 정렬된 상품 목록
 */
export const sortSavingsProductsByAnnualRate = (products: SavingsProduct[]): SavingsProduct[] => {
  return [...products].sort((a, b) => b.annualRate - a.annualRate);
};
