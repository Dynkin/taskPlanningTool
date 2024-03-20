import React, { memo } from 'react';
import { BIQWithPercentInput } from './BIQWithPercentInput/BIQWithPercentInput';

import type { Inputs } from '../CoreForm.types';
import type {
  UseFormRegister,
  UseFieldArrayRemove,
  FieldErrors,
  UseFormSetValue,
  Control,
} from 'react-hook-form';

type Props = {
  employeeFieldIndex: number;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  remove: UseFieldArrayRemove;
  control: Control<Inputs, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

const EmployeeInputComponent: React.FC<Props> = ({
  employeeFieldIndex,
  register,
  errors,
  setValue,
  remove,
  control,
}) => {
  return (
    <div className='mt-4'>
      <section className='flex items-end gap-4'>
        <div className='w-full'>
          <label
            htmlFor={`employees.${employeeFieldIndex}.fio`}
            className='text-md block font-medium text-slate-700'
          >
            ФИО (полностью)
          </label>
          <input
            type='text'
            id={`employees.${employeeFieldIndex}.fio`}
            className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            {...register(`employees.${employeeFieldIndex}.fio` as const, {
              required: true,
            })}
          />
          {errors.employees?.[employeeFieldIndex]?.fio && (
            <p className='text-red-500'>Обязательное поле</p>
          )}
        </div>

        <div className='w-full'>
          <label
            htmlFor={`employees.${employeeFieldIndex}.fioShort`}
            className='text-md block font-medium text-slate-700'
          >
            ФИО (сокращенное)
          </label>
          <input
            type='text'
            id={`employees.${employeeFieldIndex}.fioShort`}
            className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            {...register(`employees.${employeeFieldIndex}.fioShort` as const, {
              required: true,
            })}
          />
          {errors.employees?.[employeeFieldIndex]?.fioShort && (
            <p className='text-red-500'>Обязательное поле</p>
          )}
        </div>

        <div className='w-full'>
          <label
            htmlFor={`employees.${employeeFieldIndex}.jiraLogin`}
            className='text-md block font-medium text-slate-700'
          >
            Логин Jira
          </label>
          <input
            type='text'
            id={`employees.${employeeFieldIndex}.jiraLogin`}
            className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            {...register(`employees.${employeeFieldIndex}.jiraLogin` as const, {
              required: true,
            })}
          />
          {errors.employees?.[employeeFieldIndex]?.jiraLogin && (
            <p className='text-red-500'>Обязательное поле</p>
          )}
        </div>

        <div className='w-full'>
          <label
            htmlFor={`employees.${employeeFieldIndex}.psu`}
            className='text-md block font-medium text-slate-700'
          >
            Процент ПШЕ
          </label>
          <input
            type='number'
            step='0.01'
            id={`employees.${employeeFieldIndex}.psu`}
            className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='% ПШЕ'
            {...register(`employees.${employeeFieldIndex}.psu` as const, {
              required: true,
              valueAsNumber: true,
            })}
          />
          {errors.employees?.[employeeFieldIndex]?.psu && (
            <p className='text-red-500'>Обязательное поле</p>
          )}
        </div>

        <button
          type='button'
          className='h-10 rounded-md border border-red-500 px-4 text-sm leading-6 text-red-500 shadow-sm'
          onClick={() => remove(employeeFieldIndex)}
        >
          Удалить
        </button>
      </section>

      <BIQWithPercentInput
        nestIndex={employeeFieldIndex}
        control={control}
        register={register}
        setValue={setValue}
      />
    </div>
  );
};

export const EmployeeInput = memo(EmployeeInputComponent);
