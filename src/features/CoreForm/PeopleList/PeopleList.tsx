import React, { memo } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { PeopleListItem } from './PeopleListItem/PeopleListItem';

export type PeopleListItem = {
  fio: string;
  fioShort: string;
  jiraLogin: string;
  psu: number;
};

export type Inputs = {
  people: PeopleListItem[];
};

type Props = {
  peopleList: PeopleListItem[];
  setPeopleList: React.Dispatch<React.SetStateAction<PeopleListItem[]>>;
};

const PeopleListComponent: React.FC<Props> = ({
  peopleList,
  setPeopleList,
}) => {
  const {
    register,
    control,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      people: peopleList,
    },
  });

  const peopleFieldArray = useFieldArray({
    name: 'people',
    control,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('peopleListFormResult', data);
    setPeopleList(data.people);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='flex flex-col gap-2'>
            {peopleFieldArray.fields.map((peopleListItemField, index) => (
              <PeopleListItem
                key={peopleListItemField.id}
                peopleListItemFieldIndex={index}
                register={register}
                errors={errors}
                remove={peopleFieldArray.remove}
              />
            ))}
          </div>

          <button
            type='button'
            className='group mt-4 flex items-center rounded-md bg-blue-500 py-2 pl-2 pr-3 text-sm font-medium text-white shadow-sm hover:bg-blue-400'
            onClick={() =>
              peopleFieldArray.append({
                fio: '',
                surname: '',
                jiraLogin: '',
                psu: 100,
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
            Добавить нового сотрудника
          </button>
        </div>

        <button
          type='submit'
          className='mt-8 h-10 rounded-md border border-slate-200 px-6 font-semibold text-slate-900'
        >
          Сохранить список сотрудников
        </button>
      </form>
    </div>
  );
};

export const PeopleList = memo(PeopleListComponent);
