import { Filter } from 'pages/SavingsCalculatorPage';
import { SavingsProduct } from 'types/savingsProducts';

const monthlyAmountFilter = (filter: Filter, product: SavingsProduct) => {
  return filter.monthlyAmount >= product.minMonthlyAmount && filter.monthlyAmount <= product.maxMonthlyAmount;
};

const availableTermsFilter = (filter: Filter, product: SavingsProduct) => {
  return product.availableTerms === filter.term;
};

export const filterSavingsProducts = (filter: Filter, products: SavingsProduct[]): SavingsProduct[] => {
  return products.filter(product => {
    if (filter.monthlyAmount === 0 && filter.term === 0) {
      return true;
    }
    return monthlyAmountFilter(filter, product) && availableTermsFilter(filter, product);
  });
};
