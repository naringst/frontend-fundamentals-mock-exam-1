import { ChangeEvent } from 'react';
import { SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { SavingsProductsFilter } from 'types/savingsProducts';

interface CalculatorInputsProps {
  filter: SavingsProductsFilter;
  onChange: {
    goalPrice: (value: number) => void;
    monthlyAmount: (value: number) => void;
    term: (value: number) => void;
  };
}

export const CalculatorInputs = ({ filter, onChange }: CalculatorInputsProps) => {
  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={filter.goalPrice === 0 ? '' : filter.goalPrice.toString()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange.goalPrice(Number(e.target.value))}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        value={filter.monthlyAmount === 0 ? '' : filter.monthlyAmount.toString()}
        suffix="원"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange.monthlyAmount(Number(e.target.value))}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={filter.term}
        onChange={value => onChange.term(value)}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>
    </>
  );
};
