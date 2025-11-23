import { http } from 'tosslib';
import { SavingsProduct } from 'types/savingsProducts';

export const getSavingsProducts = async (): Promise<SavingsProduct[]> => {
  return http.get<SavingsProduct[]>('/api/savings-products');
};
