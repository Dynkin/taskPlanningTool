import React, { memo } from 'react';
import { InputField } from '@/common/components/InputField/InputField';

import type { Inputs } from '../PeopleList';
import type {
  UseFieldArrayRemove,
  FieldErrors,
  Control,
} from 'react-hook-form';

type Props = {
  peopleListItemFieldIndex: number;
  control: Control<Inputs, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<Inputs>;
  remove: UseFieldArrayRemove;
};

const PeopleListItemComponent: React.FC<Props> = ({
  peopleListItemFieldIndex,
  control,
  errors,
  remove,
}) => {
  return (
    <div className='flex items-end gap-4'>
      <div className='block w-20 text-lg font-bold leading-10 text-slate-700'>
        {peopleListItemFieldIndex + 1}
      </div>
      <div className='w-full'>
        <InputField
          label='ФИО (полностью)'
          control={control}
          name={`people.${peopleListItemFieldIndex}.fio` as const}
          rules={{
            required: {
              value: true,
              message: 'ФИО (полностью) обязательное поле',
            },
          }}
          error={errors.people?.[peopleListItemFieldIndex]?.fio}
        />
      </div>

      <div className='w-full'>
        <InputField
          label='ФИО (сокращенное)'
          control={control}
          name={`people.${peopleListItemFieldIndex}.fioShort` as const}
          rules={{
            required: {
              value: true,
              message: 'ФИО (сокращенное) обязательное поле',
            },
          }}
          error={errors.people?.[peopleListItemFieldIndex]?.fioShort}
        />
      </div>

      <div className='w-full'>
        <InputField
          label='Логин Jira'
          control={control}
          name={`people.${peopleListItemFieldIndex}.jiraLogin` as const}
          rules={{
            required: {
              value: true,
              message: 'Логин Jira обязательное поле',
            },
          }}
          error={errors.people?.[peopleListItemFieldIndex]?.jiraLogin}
        />
      </div>

      <div className='w-full'>
        <InputField
          type='number'
          placeholder='100'
          label='Процент ПШЕ'
          control={control}
          name={`people.${peopleListItemFieldIndex}.psu` as const}
          rules={{
            required: {
              value: true,
              message: 'Процент ПШЕ обязательное поле',
            },
            min: {
              value: 1,
              message: 'Процент ПШЕ должен быть не меньше 1%',
            },
            max: {
              value: 100,
              message: 'Процент ПШЕ должен быть не больше 100%',
            },
            valueAsNumber: true,
          }}
          error={errors.people?.[peopleListItemFieldIndex]?.psu}
        />
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
