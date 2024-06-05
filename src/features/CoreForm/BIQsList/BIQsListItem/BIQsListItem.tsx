import React, { memo } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { InputField } from '@/common/components/InputField/InputField';

import type { Inputs } from '../BIQsList';
import type {
  UseFieldArrayRemove,
  FieldErrors,
  Control,
} from 'react-hook-form';

type Props = {
  BIQsListItemFieldIndex: number;
  control: Control<Inputs, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<Inputs>;
  remove: UseFieldArrayRemove;
};

const BIQsListItemComponent: React.FC<Props> = ({
  BIQsListItemFieldIndex,
  control,
  errors,
  remove,
}) => {
  return (
    <div className='flex items-end gap-4'>
      <div className='w-5 shrink-0 grow-0 text-lg font-bold leading-8 text-slate-700'>
        {BIQsListItemFieldIndex + 1}
      </div>
      <div className='grow'>
        <InputField
          label='Номер БИКа в Jira'
          placeholder='BIQ-11111'
          control={control}
          name={`BIQs.${BIQsListItemFieldIndex}.BIQTaskId` as const}
          rules={{
            required: {
              value: true,
              message: 'Номер БИКа в Jira обязательное поле',
            },
          }}
          error={errors.BIQs?.[BIQsListItemFieldIndex]?.BIQTaskId}
        />
      </div>
      <div className='grow-[3]'>
        <InputField
          label='Название БИКа'
          placeholder='БИК про импортозамещение компонента АБВГД'
          control={control}
          name={`BIQs.${BIQsListItemFieldIndex}.BIQTaskSummary` as const}
          rules={{
            required: {
              value: true,
              message: 'Название БИКа обязательное поле',
            },
          }}
          error={errors.BIQs?.[BIQsListItemFieldIndex]?.BIQTaskSummary}
        />
      </div>
      <Button
        className='shrink-0 grow-0'
        type='primary'
        icon={<DeleteOutlined />}
        onClick={() => remove(BIQsListItemFieldIndex)}
        danger
      >
        Удалить
      </Button>
    </div>
  );
};

export const BIQsListItem = memo(BIQsListItemComponent);
