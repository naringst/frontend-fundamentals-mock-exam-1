import { useQuery } from '@tanstack/react-query';
import { savingsProductQueryOptions } from 'queries/savings/queries';
import { filterSavingsProducts } from 'service/savingsCalculator.service';
import { ListRow, colors, Assets } from 'tosslib';
import { SavingsProduct } from 'types/savingsProducts';

export interface Filter {
  goalPrice: number;
  monthlyAmount: number;
  term: number;
}

export const SavingsProducts = ({ filter }: { filter: Filter }) => {
  const { data: savingsProducts } = useQuery(savingsProductQueryOptions());

  if (!savingsProducts || savingsProducts.length === 0) {
    return <div>적금 상품이 없습니다.</div>;
  }

  const filteredSavingsProducts = filterSavingsProducts(filter, savingsProducts);
  if (!filteredSavingsProducts || filteredSavingsProducts.length === 0) {
    return <div>조건에 맞는 적금 상품이 없습니다.</div>;
  }

  return (
    <>
      {filteredSavingsProducts.map((product: SavingsProduct) => {
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
            right={<Assets.Icon name="icon-check-circle-green" />}
            onClick={() => {}}
          />
        );
      })}
    </>
  );
};
