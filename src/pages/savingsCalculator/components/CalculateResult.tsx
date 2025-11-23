import { useQuery } from '@tanstack/react-query';
import { savingsProductQueryOptions } from 'queries/savings/queries';
import {
  calcDiffBetweenGoalAndEarnings,
  calcRecommendMonthlyAmount,
  calculateExpectedEarnings,
} from 'service/savingsCalculator.service';
import { Spacing, ListRow, colors, Border, ListHeader, Assets } from 'tosslib';
import { SavingsProduct, SavingsProductsFilter } from 'types/savingsProducts';
import { useFilteredSavingsProducts } from '../hooks/useFilteredSavingsProducts';

export const CalculateResult = ({
  filter,
  selectedProductId,
}: {
  filter: SavingsProductsFilter;
  selectedProductId: string | null;
}) => {
  const { data: savingsProducts } = useQuery(savingsProductQueryOptions());
  const selectedProduct = savingsProducts?.find((product: SavingsProduct) => product.id === selectedProductId);

  const { filteredProducts } = useFilteredSavingsProducts({
    filter,
    sortByAnnualRate: true,
  });
  const sortedSavingsProducts = filteredProducts.slice(0, 2);

  if (!selectedProductId || !selectedProduct) {
    return (
      <>
        <Spacing size={40} />
        <div style={{ textAlign: 'center', color: colors.grey600 }}>상품을 선택해주세요</div>
      </>
    );
  }

  const expectedEarnings = calculateExpectedEarnings(filter.monthlyAmount, filter.term, selectedProduct.annualRate);
  const diffBetweenGoalAndEarnings = calcDiffBetweenGoalAndEarnings(filter.goalPrice, expectedEarnings);
  const recommendMonthlyAmount = calcRecommendMonthlyAmount(filter.goalPrice, filter.term, selectedProduct.annualRate);

  return (
    <>
      <Spacing size={8} />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${expectedEarnings.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${diffBetweenGoalAndEarnings.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${recommendMonthlyAmount.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {/* 추천 적금 리스트 이자율 높은 순서로  */}
      {sortedSavingsProducts.map((product: SavingsProduct) => {
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
          />
        );
      })}
      <Spacing size={40} />
    </>
  );
};
