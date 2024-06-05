import React, { memo } from 'react';
import { useFieldArray, useWatch, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { Button } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { SelectField } from '@/common/components/SelectField/SelectField';
import { InputField } from '@/common/components/InputField/InputField';

import type {
  UseFormRegister,
  Control,
  UseFormSetValue,
  FieldErrors,
} from 'react-hook-form';
import type { Inputs } from '../../CoreForm.types';
import type { BIQsListItem } from '../../BIQsList/BIQsList';

type Props = {
  biqsList: BIQsListItem[];
  nestIndex: number;
  control: Control<Inputs, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  errors: FieldErrors<Inputs>;
};

const BIQWithPercentInputComponent: React.FC<Props> = ({
  biqsList,
  nestIndex,
  control,
  setValue,
  errors,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `employees.${nestIndex}.BIQsWithPercent`,
  });

  const watchedBIQs = useWatch({
    control,
    name: `employees.${nestIndex}.BIQsWithPercent`,
  });

  const watchedEmployeePsu = useWatch({
    control,
    name: `employees.${nestIndex}.psu`,
  });

  const watchedMonthWorkHours = useWatch({
    control,
    name: 'monthWorkHours',
  });

  const totalBIQPercents = watchedBIQs.reduce(
    (acc, BIQ) => acc + BIQ.percent,
    0
  );
  const totalBIQHours = watchedBIQs.reduce((acc, BIQ) => acc + BIQ.hours, 0);
  const totalBIQCount = watchedBIQs.length;

  const isSuccessTotalBIQHours =
    totalBIQHours === (watchedMonthWorkHours * watchedEmployeePsu) / 100;
  const isSuccessTotalBIQPercents = totalBIQPercents >= 100;

  const totalBIQHoursClassName = classNames(
    {
      'bg-red-500': !isSuccessTotalBIQHours,
      'bg-green-500': isSuccessTotalBIQHours,
    },
    'px-6',
    'py-4',
    'rounded-md',
    'text-white'
  );

  const totalBIQPercentsClassName = classNames(
    {
      'bg-red-500': !isSuccessTotalBIQPercents,
      'bg-green-500': isSuccessTotalBIQPercents,
    },
    'px-6',
    'py-4',
    'rounded-md',
    'text-white'
  );

  const biqsOptions = biqsList.map((BIQ) => ({
    value: BIQ.BIQTaskId,
    label: `${BIQ.BIQTaskId} ${BIQ.BIQTaskSummary}`,
  }));
  biqsOptions.sort((a, b) =>
    parseInt(a.value.replace('BIQ-', ''), 10) >
    parseInt(b.value.replace('BIQ-', ''), 10)
      ? 1
      : -1
  );

  return (
    <div className='mt-4'>
      <div className='grid grid-cols-4 gap-4'>
        {fields.map((item, index) => {
          return (
            <div
              key={item.id}
              className='rounded-md border border-gray-200 p-4 shadow-sm'
            >
              <Controller
                control={control}
                name={`employees.${nestIndex}.BIQsWithPercent.${index}.BIQ`}
                rules={{
                  required: 'Не указан BIQ',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SelectField
                    placeholder='Выберите BIQ'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label='BIQ'
                    options={biqsOptions}
                    id={`employees.${nestIndex}.BIQsWithPercent.${index}.BIQ`}
                    showSearch
                  />
                )}
              />
              <div className='mt-4'>
                <InputField
                  type='number'
                  step='0.01'
                  label='Процент занятости'
                  control={control}
                  name={
                    `employees.${nestIndex}.BIQsWithPercent.${index}.percent` as const
                  }
                  rules={{
                    required: {
                      value: true,
                      message: 'Процент занятости обязательное поле',
                    },
                    valueAsNumber: true,
                  }}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    const calculatedHours =
                      ((watchedMonthWorkHours / 100) *
                        watchedEmployeePsu *
                        value) /
                      100;
                    setValue(
                      `employees.${nestIndex}.BIQsWithPercent.${index}.hours`,
                      parseFloat(calculatedHours.toFixed(2))
                    );
                  }}
                  error={
                    errors.employees?.[nestIndex]?.BIQsWithPercent?.[index]
                      ?.percent
                  }
                />
              </div>

              <div className='mt-4'>
                <InputField
                  type='number'
                  label='Количество часов'
                  control={control}
                  name={
                    `employees.${nestIndex}.BIQsWithPercent.${index}.hours` as const
                  }
                  rules={{
                    required: {
                      value: true,
                      message: 'Количество часов обязательное поле',
                    },
                    valueAsNumber: true,
                  }}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    const calculatedPercent =
                      (value * 100) /
                      ((watchedMonthWorkHours / 100) * watchedEmployeePsu);
                    setValue(
                      `employees.${nestIndex}.BIQsWithPercent.${index}.percent`,
                      parseFloat(calculatedPercent.toFixed(2))
                    );
                  }}
                  error={
                    errors.employees?.[nestIndex]?.BIQsWithPercent?.[index]
                      ?.hours
                  }
                />
              </div>

              <Button
                type='primary'
                className='mt-4'
                onClick={() => remove(index)}
                icon={<DeleteOutlined />}
                danger
              >
                Удалить BIQ
              </Button>
            </div>
          );
        })}
      </div>

      <Button
        type='primary'
        className='mt-4'
        onClick={() =>
          append({
            BIQ: undefined,
            percent: 0,
            hours: 0,
          })
        }
        icon={<PlusCircleOutlined />}
      >
        Добавить BIQ
      </Button>

      {totalBIQCount > 0 && (
        <div className='mt-4 flex gap-6 border-t border-gray-200 pt-4'>
          <div className={totalBIQHoursClassName}>
            <div className='text-lg'>Общее количество часов</div>
            <div className='pt-2 text-2xl font-extrabold'>{totalBIQHours}</div>
          </div>
          <div className={totalBIQPercentsClassName}>
            <div className='text-lg'>Общий процент занятости</div>
            <div className='py-2 text-2xl font-extrabold'>
              {totalBIQPercents.toFixed(2)}%
            </div>
          </div>
          <div className='rouded-md rounded-md bg-gray-200 px-6 py-4'>
            <div className='text-lg'>Общее количество БИКов</div>
            <div className='py-2 text-2xl font-extrabold'>{totalBIQCount}</div>
          </div>
          <div className='rouded-md rounded-md bg-gray-200 px-6 py-4'>
            <div className='text-lg'>Загрузка ПШЕ</div>
            <div className='py-2 text-2xl font-extrabold'>
              {watchedEmployeePsu}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const BIQWithPercentInput = memo(BIQWithPercentInputComponent);
