import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';

import { CalculatorInputs } from './components/CalculatorInputs';
import { SavingsProducts } from './components/SavingsProducts';
import { CalculateResult } from './components/CalculateResult';

export function SavingsCalculatorPage() {
  const [goalPrice, setGoalPrice] = useState<number>(0);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(0);
  const [term, setTerm] = useState<number>(12);

  const [currentTab, setCurrentTab] = useState<'products' | 'results'>('products');

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId === selectedProductId ? null : productId);
  };

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

      <ErrorBoundary fallback={<div>오류가 발생했습니다.</div>}>
        <Suspense fallback={<div>로딩 중...</div>}>
          {(() => {
            switch (currentTab) {
              case 'products':
                return (
                  <SavingsProducts
                    filter={{ goalPrice, monthlyAmount, term }}
                    selectedProductId={selectedProductId}
                    onProductSelect={handleProductSelect}
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
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
