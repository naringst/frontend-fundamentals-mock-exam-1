export interface SavingsProduct {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}

export interface SavingsProductsFilter {
  goalPrice: number;
  monthlyAmount: number;
  term: number;
}
