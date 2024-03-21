import React, { memo } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';

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
    register,
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
                  <label
                    htmlFor={`BIQs.${index}.BIQTaskId`}
                    className='text-md block font-medium text-slate-700'
                  >
                    Номер БИКа в Jira
                  </label>
                  <input
                    type='text'
                    id={`BIQs.${index}.BIQTaskId`}
                    className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    {...register(`BIQs.${index}.BIQTaskId` as const, {
                      required: true,
                    })}
                  />
                  {errors.BIQs?.[index]?.BIQTaskId && (
                    <p className='text-red-500'>Обязательное поле</p>
                  )}
                </div>

                <div className='w-full'>
                  <label
                    htmlFor={`BIQs.${index}.BIQTaskSummary`}
                    className='text-md block font-medium text-slate-700'
                  >
                    Название БИКа
                  </label>
                  <input
                    type='text'
                    id={`BIQs.${index}.BIQTaskSummary`}
                    className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    {...register(`BIQs.${index}.BIQTaskSummary` as const, {
                      required: true,
                    })}
                  />
                  {errors.BIQs?.[index]?.BIQTaskSummary && (
                    <p className='text-red-500'>Обязательное поле</p>
                  )}
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
