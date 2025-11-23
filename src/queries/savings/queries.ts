import { QueryOptions } from '@tanstack/react-query';
import { getSavingsProducts } from 'api/savingsProducts';
import { SavingsProduct } from 'types/savingsProducts';

type SavingsProductQueryOptions = QueryOptions<SavingsProduct[]>;
type SavingsProductQueryOptionsInput = Omit<SavingsProductQueryOptions, 'queryKey' | 'queryFn'>;

export const savingsProductQueryOptions = (options?: SavingsProductQueryOptionsInput) => {
  return {
    queryKey: ['savingsProducts'],
    queryFn: getSavingsProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    throwOnError: true,
    ...options,
  };
};
