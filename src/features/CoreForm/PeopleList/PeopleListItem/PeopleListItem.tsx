import React, { memo } from 'react';

import type { Inputs } from '../PeopleList';
import type {
  UseFormRegister,
  UseFieldArrayRemove,
  FieldErrors,
} from 'react-hook-form';

type Props = {
  peopleListItemFieldIndex: number;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  remove: UseFieldArrayRemove;
};

const PeopleListItemComponent: React.FC<Props> = ({
  peopleListItemFieldIndex,
  register,
  errors,
  remove,
}) => {
  return (
    <div className='flex items-end gap-4'>
      <div className='block w-20 text-lg font-bold leading-10 text-slate-700'>
        {peopleListItemFieldIndex + 1}
      </div>
      <div className='w-full'>
        <label
          htmlFor={`people.${peopleListItemFieldIndex}.fio`}
          className='text-md block font-medium text-slate-700'
        >
          ФИО
        </label>
        <input
          type='text'
          id={`people.${peopleListItemFieldIndex}.fio`}
          className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
          {...register(`people.${peopleListItemFieldIndex}.fio` as const, {
            required: true,
          })}
        />
        {errors.people?.[peopleListItemFieldIndex]?.fio && (
          <p className='text-red-500'>Обязательное поле</p>
        )}
      </div>

      <div className='w-full'>
        <label
          htmlFor={`people.${peopleListItemFieldIndex}.surname`}
          className='text-md block font-medium text-slate-700'
        >
          Фамилия
        </label>
        <input
          type='text'
          id={`people.${peopleListItemFieldIndex}.surname`}
          className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
          {...register(`people.${peopleListItemFieldIndex}.surname` as const, {
            required: true,
          })}
        />
        {errors.people?.[peopleListItemFieldIndex]?.surname && (
          <p className='text-red-500'>Обязательное поле</p>
        )}
      </div>

      <div className='w-full'>
        <label
          htmlFor={`people.${peopleListItemFieldIndex}.jiraLogin`}
          className='text-md block font-medium text-slate-700'
        >
          Логин Jira
        </label>
        <input
          type='text'
          id={`people.${peopleListItemFieldIndex}.jiraLogin`}
          className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
          {...register(
            `people.${peopleListItemFieldIndex}.jiraLogin` as const,
            {
              required: true,
            }
          )}
        />
        {errors.people?.[peopleListItemFieldIndex]?.jiraLogin && (
          <p className='text-red-500'>Обязательное поле</p>
        )}
      </div>

      <div className='w-full'>
        <label
          htmlFor={`people.${peopleListItemFieldIndex}.psu`}
          className='text-md block font-medium text-slate-700'
        >
          Процент ПШЕ
        </label>
        <input
          type='number'
          step='0.01'
          id={`people.${peopleListItemFieldIndex}.psu`}
          className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='% ПШЕ'
          {...register(`people.${peopleListItemFieldIndex}.psu` as const, {
            required: true,
            valueAsNumber: true,
          })}
        />
        {errors.people?.[peopleListItemFieldIndex]?.psu && (
          <p className='text-red-500'>Обязательное поле</p>
        )}
      </div>

      <button
        type='button'
        className='h-10 rounded-md border border-red-500 px-4 text-sm leading-6 text-red-500 shadow-sm'
        onClick={() => remove(peopleListItemFieldIndex)}
      >
        Удалить
      </button>
    </div>
  );
};

export const PeopleListItem = memo(PeopleListItemComponent);
