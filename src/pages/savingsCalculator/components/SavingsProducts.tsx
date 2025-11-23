import { ListRow, colors, Assets } from 'tosslib';
import { SavingsProduct, SavingsProductsFilter } from 'types/savingsProducts';
import { useFilteredSavingsProducts } from '../hooks/useFilteredSavingsProducts';

interface SavingsProductsProps {
  filter: SavingsProductsFilter;
  selectedProductId: string | null;
  onProductSelect: (productId: string) => void;
}

export const SavingsProducts = ({ filter, selectedProductId, onProductSelect }: SavingsProductsProps) => {
  const { filteredProducts, isEmpty } = useFilteredSavingsProducts({ filter });

  if (isEmpty) {
    return <div>조건에 맞는 적금 상품이 없습니다.</div>;
  }

  return (
    <>
      {filteredProducts.map((product: SavingsProduct) => {
        return (
          <ListRow
            key={product.id}
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={product.name}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: ${product.annualRate}%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            right={selectedProductId === product.id && <Assets.Icon name="icon-check-circle-green" />}
            onClick={() => onProductSelect(product.id)}
          />
        );
      })}
    </>
  );
};
