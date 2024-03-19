import React, { memo } from 'react';
import { useFieldArray } from 'react-hook-form';

import type { UseFormRegister, Control } from 'react-hook-form';
import type { Inputs } from '../CoreForm';

type Props = {
  nestIndex: number;
  control: Control<Inputs, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<Inputs>;
};

const BIQWithPercentInputComponent: React.FC<Props> = ({
  nestIndex,
  control,
  register,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `employees.${nestIndex}.BIQsWithPercent`,
  });

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
                  id={`employees.${nestIndex}.BIQsWithPercent.${index}.percent`}
                  className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  {...register(
                    `employees.${nestIndex}.BIQsWithPercent.${index}.percent`,
                    {
                      required: true,
                      valueAsNumber: true,
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
                  id={`employees.${nestIndex}.BIQsWithPercent.${index}.hours`}
                  className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  {...register(
                    `employees.${nestIndex}.BIQsWithPercent.${index}.hours`,
                    {
                      required: true,
                      valueAsNumber: true,
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
        className='mt-4 block h-10 rounded-md border border-slate-200 px-6 font-semibold text-slate-900 shadow-sm'
        onClick={() =>
          append({
            BIQ: '',
            percent: 0,
            hours: 0,
          })
        }
      >
        Добавить BIQ
      </button>
    </div>
  );
};

export const BIQWithPercentInput = memo(BIQWithPercentInputComponent);
