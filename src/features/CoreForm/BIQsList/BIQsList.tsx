import React, { memo } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { InputField } from '@/common/components/InputField/InputField';

export type BIQsListItem = {
  BIQTaskId: string;
  BIQTaskSummary: string;
};

export type Inputs = {
  BIQs: BIQsListItem[];
};

type Props = {
  biqsList: BIQsListItem[];
  setBiqsList: React.Dispatch<React.SetStateAction<BIQsListItem[]>>;
  className?: string;
};

const BIQsListComponent: React.FC<Props> = ({
  biqsList,
  setBiqsList,
  className,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      BIQs: biqsList,
    },
  });

  const BIQsFieldArray = useFieldArray({
    name: 'BIQs',
    control,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setBiqsList(data.BIQs);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='flex flex-col gap-4'>
            {BIQsFieldArray.fields.map((BIQsListItemField, index) => (
              <div key={BIQsListItemField.id} className='flex items-end gap-4'>
                <div className='w-full'>
                  <InputField
                    label='Номер БИКа в Jira'
                    control={control}
                    name={`BIQs.${index}.BIQTaskId` as const}
                    rules={{
                      required: {
                        value: true,
                        message: 'Номер БИКа в Jira обязательное поле',
                      },
                    }}
                    error={errors.BIQs?.[index]?.BIQTaskId}
                  />
                </div>
                <div className='w-full'>
                  <InputField
                    label='Название БИКа'
                    control={control}
                    name={`BIQs.${index}.BIQTaskSummary` as const}
                    rules={{
                      required: {
                        value: true,
                        message: 'Название БИКа обязательное поле',
                      },
                    }}
                    error={errors.BIQs?.[index]?.BIQTaskSummary}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type='button'
            className='group mt-4 flex items-center rounded-md bg-blue-500 py-2 pl-2 pr-3 text-sm font-medium text-white shadow-sm hover:bg-blue-400'
            onClick={() =>
              BIQsFieldArray.append({
                BIQTaskId: '',
                BIQTaskSummary: '',
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
            Добавить новый БИК
          </button>
        </div>

        <button
          type='submit'
          className='mt-8 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-400'
        >
          Сохранить список БИКов
        </button>
      </form>
    </div>
  );
};

export const BIQsList = memo(BIQsListComponent);
