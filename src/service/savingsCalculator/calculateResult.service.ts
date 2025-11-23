import type { SavingsProduct } from 'types/savingsProducts';

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
