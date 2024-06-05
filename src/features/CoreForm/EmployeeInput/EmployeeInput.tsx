import React, { memo, useState, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { BIQWithPercentInput } from './BIQWithPercentInput/BIQWithPercentInput';
import { Select, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { defaultSelectFilterOption } from '@/utils/inputUtils';
import { InputField } from '@/common/components/InputField/InputField';

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
    const currentFio = watchedEmployees[employeeFieldIndex]?.fio;
    const employeeIndex = watchedEmployees.findIndex(
      (employee) => employee.fio === currentFio
    );
    if (employeeIndex >= 0 && currentFio !== '') {
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
  const collator = new Intl.Collator('en', {
    numeric: true,
    sensitivity: 'base',
  });
  peopleOptions.sort((a, b) => {
    return collator.compare(a.label, b.label);
  });

  const selectOnChangeHandler = (value: string) => {
    const foundEmployee = peopleList.find((person) => person.fio === value);
    setValue(`employees.${employeeFieldIndex}.fio`, foundEmployee?.fio || '');
    setValue(
      `employees.${employeeFieldIndex}.fioShort`,
      foundEmployee?.fioShort || ''
    );
    setValue(
      `employees.${employeeFieldIndex}.jiraLogin`,
      foundEmployee?.jiraLogin || ''
    );
    setValue(`employees.${employeeFieldIndex}.psu`, foundEmployee?.psu || 100);
    setEmployeeIsVisible(true);
  };

  return (
    <div className='mt-4 rounded-md border border-gray-200 p-4'>
      <section>
        {!employeeIsVisible ? (
          <div className='flex items-end gap-4'>
            <Select
              placeholder='Выберите сотрудника'
              className='w-80'
              id={`employees.${employeeFieldIndex}.fio`}
              onChange={selectOnChangeHandler}
              options={peopleOptions}
              filterOption={defaultSelectFilterOption}
              showSearch
            />
            <Button
              className='shrink-0 grow-0'
              type='primary'
              icon={<DeleteOutlined />}
              onClick={() => remove(employeeFieldIndex)}
              danger
            >
              Удалить
            </Button>
          </div>
        ) : (
          <div>
            <div className='flex items-end gap-4'>
              <div className='shrink-0 grow-[2]'>
                <InputField
                  label='ФИО (полностью)'
                  control={control}
                  name={`employees.${employeeFieldIndex}.fio` as const}
                  disabled
                />
              </div>

              <div className='shrink-0 grow'>
                <InputField
                  label='ФИО (сокращенное)'
                  control={control}
                  name={`employees.${employeeFieldIndex}.fioShort` as const}
                  disabled
                />
              </div>

              <div className='shrink-0 grow'>
                <InputField
                  label='Логин Jira'
                  control={control}
                  name={`employees.${employeeFieldIndex}.jiraLogin` as const}
                  disabled
                />
              </div>

              <div className='shrink-0 grow'>
                <InputField
                  label='Процент ПШЕ'
                  control={control}
                  name={`employees.${employeeFieldIndex}.psu` as const}
                  disabled
                />
              </div>

              <Button
                type='primary'
                className='shrink-0 grow-0'
                icon={<DeleteOutlined />}
                onClick={() => remove(employeeFieldIndex)}
                danger
              >
                Удалить
              </Button>
            </div>

            <BIQWithPercentInput
              biqsList={biqsList}
              nestIndex={employeeFieldIndex}
              control={control}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export const EmployeeInput = memo(EmployeeInputComponent);
