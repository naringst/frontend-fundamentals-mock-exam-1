import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';

import { CalculatorInputs } from './components/CalculatorInputs';
import { SavingsProducts } from './components/SavingsProducts';
import { CalculateResult } from './components/CalculateResult';

export function SavingsCalculatorPage() {
  return (
    <ErrorBoundary fallback={<div>오류가 발생했습니다.</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <SavingCalculator />
      </Suspense>
    </ErrorBoundary>
  );
}

const SavingCalculator = () => {
  const [goalPrice, setGoalPrice] = useState<number>(0);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(0);
  const [term, setTerm] = useState<number>(12);

  const [currentTab, setCurrentTab] = useState<'products' | 'results'>('products');

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <CalculatorInputs
        filter={{ goalPrice, monthlyAmount, term }}
        onChange={{
          goalPrice: setGoalPrice,
          monthlyAmount: setMonthlyAmount,
          term: setTerm,
        }}
      />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab
        onChange={(value: string) => {
          setCurrentTab(value as 'products' | 'results');
        }}
      >
        <Tab.Item value="products" selected={currentTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={currentTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {(() => {
        switch (currentTab) {
          case 'products':
            return (
              <SavingsProducts
                filter={{ goalPrice, monthlyAmount, term }}
                selectedProductId={selectedProductId}
                setSelectedProductId={setSelectedProductId}
              />
            );
          case 'results':
            return (
              <CalculateResult filter={{ goalPrice, monthlyAmount, term }} selectedProductId={selectedProductId} />
            );
          default:
            return null;
        }
      })()}

      {/* 아래는 사용자가 적금 상품을 선택하지 않고 계산 결과 탭을 선택했을 때 출력해주세요. */}
      {/* <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} /> */}
    </>
  );
};
