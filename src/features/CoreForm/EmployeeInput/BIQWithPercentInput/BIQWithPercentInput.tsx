import React, { memo } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import classNames from 'classnames';

import type {
  UseFormRegister,
  Control,
  UseFormSetValue,
} from 'react-hook-form';
import type { Inputs } from '../../CoreForm.types';

type Props = {
  nestIndex: number;
  control: Control<Inputs, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
};

const BIQWithPercentInputComponent: React.FC<Props> = ({
  nestIndex,
  control,
  register,
  setValue,
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

  const isSuccess =
    totalBIQPercents === 100 &&
    totalBIQHours === (watchedMonthWorkHours * watchedEmployeePsu) / 100;

  const totalItemClassName = classNames(
    {
      'bg-red-500': !isSuccess,
      'bg-green-500': isSuccess,
    },
    'px-6',
    'py-4',
    'rounded-md',
    'text-white'
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
              <div>
                <label
                  htmlFor={`employees.${nestIndex}.BIQsWithPercent.${index}.BIQ`}
                  className='text-md block font-medium text-slate-700'
                >
                  BIQ
                </label>
                <input
                  type='text'
                  id={`employees.${nestIndex}.BIQsWithPercent.${index}.BIQ`}
                  className='mt-1 block h-10 w-full appearance-none rounded-md px-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  {...register(
                    `employees.${nestIndex}.BIQsWithPercent.${index}.BIQ`,
                    {
                      required: true,
                    }
                  )}
                />
              </div>

              <div className='mt-4'>
                <label
                  htmlFor={`employees.${nestIndex}.BIQsWithPercent.${index}.percent`}
                  className='text-md block font-medium text-slate-700'
                >
                  Процент занятости
                </label>
                <input
                  type='number'
                  step='0.01'
                  id={`employees.${nestIndex}.BIQsWithPercent.${index}.percent`}
                  className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  {...register(
                    `employees.${nestIndex}.BIQsWithPercent.${index}.percent`,
                    {
                      required: true,
                      valueAsNumber: true,
                      onBlur: (e) => {
                        const value = e.target.value;
                        setValue(
                          `employees.${nestIndex}.BIQsWithPercent.${index}.hours`,
                          ((watchedMonthWorkHours / 100) *
                            watchedEmployeePsu *
                            value) /
                            100
                        );
                      },
                    }
                  )}
                />
              </div>

              <div className='mt-4'>
                <label
                  htmlFor={`employees.${nestIndex}.BIQsWithPercent.${index}.hours`}
                  className='text-md block font-medium text-slate-700'
                >
                  Количество часов
                </label>
                <input
                  type='number'
                  step='0.01'
                  id={`employees.${nestIndex}.BIQsWithPercent.${index}.hours`}
                  className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  {...register(
                    `employees.${nestIndex}.BIQsWithPercent.${index}.hours`,
                    {
                      required: true,
                      valueAsNumber: true,
                      onBlur: (e) => {
                        const value = e.target.value;
                        setValue(
                          `employees.${nestIndex}.BIQsWithPercent.${index}.percent`,
                          (value * 100) /
                            ((watchedMonthWorkHours / 100) * watchedEmployeePsu)
                        );
                      },
                    }
                  )}
                />
              </div>

              <button
                type='button'
                className='mt-4 block h-10 rounded-md border border-red-500 px-4 text-sm leading-6 text-red-500 shadow-sm'
                onClick={() => remove(index)}
              >
                Удалить BIQ
              </button>
            </div>
          );
        })}
      </div>

      <button
        type='button'
        className='group mt-4 flex items-center rounded-md bg-blue-500 py-2 pl-2 pr-3 text-sm font-medium text-white shadow-sm hover:bg-blue-400'
        onClick={() =>
          append({
            BIQ: '',
            percent: 0,
            hours: 0,
          })
        }
      >
        <svg
          width='20'
          height='20'
          fill='currentColor'
          className='mr-2'
          aria-hidden='true'
        >
          <path d='M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z' />
        </svg>
        Добавить BIQ
      </button>

      <div className='mt-4 flex gap-6 border-t border-gray-200 py-4'>
        <div className={totalItemClassName}>
          <div className='text-lg'>Общее количество часов</div>
          <div className='pt-2 text-2xl font-extrabold'>{totalBIQHours}</div>
        </div>
        <div className={totalItemClassName}>
          <div className='text-lg'>Общий процент занятости</div>
          <div className='py-2 text-2xl font-extrabold'>
            {totalBIQPercents}%
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
    </div>
  );
};

export const BIQWithPercentInput = memo(BIQWithPercentInputComponent);
