import React, { memo, useState, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { BIQWithPercentInput } from './BIQWithPercentInput/BIQWithPercentInput';

import type { Inputs } from '../CoreForm.types';
import type { PeopleListItem } from '../PeopleList/PeopleList';
import type { BIQsListItem } from '../BIQsList/BIQsList';
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
  peopleList: PeopleListItem[];
  biqsList: BIQsListItem[];
};

const EmployeeInputComponent: React.FC<Props> = ({
  employeeFieldIndex,
  register,
  errors,
  setValue,
  remove,
  control,
  peopleList,
  biqsList,
}) => {
  const [employeeIsVisible, setEmployeeIsVisible] = useState<boolean>(false);
  const watchedEmployees = useWatch({
    control,
    name: 'employees',
    defaultValue: [],
  });

  useEffect(() => {
    if (watchedEmployees[employeeFieldIndex]) {
      setEmployeeIsVisible(true);
    }
  }, [watchedEmployees, employeeFieldIndex]);

  const peopleOptions = peopleList
    .map((person) => {
      return { value: person.fio, label: person.fio };
    })
    .filter((person) =>
      watchedEmployees.findIndex((employee) => employee.fio === person.label)
    );
  peopleOptions.unshift({ value: '', label: 'Не выбрано' });

  return (
    <div className='mt-4 rounded-md border border-gray-200 p-4'>
      <section>
        {!employeeIsVisible ? (
          <select
            className='rounded-md border border-gray-300 p-2'
            id={`employees.${employeeFieldIndex}.fio`}
            onChange={(e) => {
              const foundEmployee = peopleList.find(
                (person) => person.fio === e.target.value
              );
              setValue(
                `employees.${employeeFieldIndex}.fio`,
                foundEmployee?.fio || ''
              );
              setValue(
                `employees.${employeeFieldIndex}.fioShort`,
                foundEmployee?.fioShort || ''
              );
              setValue(
                `employees.${employeeFieldIndex}.jiraLogin`,
                foundEmployee?.jiraLogin || ''
              );
              setValue(
                `employees.${employeeFieldIndex}.psu`,
                foundEmployee?.psu || 100
              );
              setEmployeeIsVisible(true);
            }}
          >
            {peopleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <div className='flex items-end gap-4'>
            <div className='w-full'>
              <label
                htmlFor={`employees.${employeeFieldIndex}.fio`}
                className='text-md block font-medium text-slate-700'
              >
                ФИО (полностью)
              </label>
              <input
                disabled
                type='text'
                id={`employees.${employeeFieldIndex}.fio`}
                className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                {...register(`employees.${employeeFieldIndex}.fio` as const, {
                  required: true,
                })}
              />
            </div>

            <div className='w-full'>
              <label
                htmlFor={`employees.${employeeFieldIndex}.fioShort`}
                className='text-md block font-medium text-slate-700'
              >
                ФИО (сокращенное)
              </label>
              <input
                disabled
                type='text'
                id={`employees.${employeeFieldIndex}.fioShort`}
                className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                {...register(
                  `employees.${employeeFieldIndex}.fioShort` as const,
                  {
                    required: true,
                  }
                )}
              />
            </div>

            <div className='w-full'>
              <label
                htmlFor={`employees.${employeeFieldIndex}.jiraLogin`}
                className='text-md block font-medium text-slate-700'
              >
                Логин Jira
              </label>
              <input
                disabled
                type='text'
                id={`employees.${employeeFieldIndex}.jiraLogin`}
                className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                {...register(
                  `employees.${employeeFieldIndex}.jiraLogin` as const,
                  {
                    required: true,
                  }
                )}
              />
            </div>

            <div className='w-full'>
              <label
                htmlFor={`employees.${employeeFieldIndex}.psu`}
                className='text-md block font-medium text-slate-700'
              >
                Процент ПШЕ
              </label>
              <input
                disabled
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
            </div>

            <button
              type='button'
              className='h-10 rounded-md border border-red-500 px-4 text-sm leading-6 text-red-500 shadow-sm'
              onClick={() => remove(employeeFieldIndex)}
            >
              Удалить
            </button>
          </div>
        )}
      </section>

      <BIQWithPercentInput
        biqsList={biqsList}
        nestIndex={employeeFieldIndex}
        control={control}
        register={register}
        setValue={setValue}
        errors={errors}
      />
    </div>
  );
};

export const EmployeeInput = memo(EmployeeInputComponent);
