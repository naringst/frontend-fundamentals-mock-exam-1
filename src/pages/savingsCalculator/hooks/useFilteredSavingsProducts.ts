import { useQuery } from '@tanstack/react-query';
import { savingsProductQueryOptions } from 'queries/savings/queries';
import { sortSavingsProductsByAnnualRate } from 'service/savingsCalculator/calculateResult.service';
import { filterSavingsProducts } from 'service/savingsCalculator/savingsCalculateFilter.service';

import { SavingsProductsFilter } from 'types/savingsProducts';

interface UseFilteredSavingsProductsOptions {
  filter: SavingsProductsFilter;
  sortByAnnualRate?: boolean;
}

export const useFilteredSavingsProducts = ({ filter, sortByAnnualRate = false }: UseFilteredSavingsProductsOptions) => {
  const { data: savingsProducts, isLoading, error } = useQuery(savingsProductQueryOptions());

  if (!savingsProducts) {
    return {
      filteredProducts: [],
      isLoading,
      error,
      isEmpty: true,
    };
  }

  const baseFilteredProducts = filterSavingsProducts(filter, savingsProducts);
  const filteredProducts = sortByAnnualRate
    ? sortSavingsProductsByAnnualRate(baseFilteredProducts)
    : baseFilteredProducts;

  return {
    filteredProducts,
    isLoading,
    error,
    isEmpty: filteredProducts.length === 0,
  };
};
