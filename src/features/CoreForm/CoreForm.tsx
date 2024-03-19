import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { BIQWithPercentInput } from './BIQWithPercentInput/BIQWithPercentInput';

type BIQWithPercent = {
  BIQ: string;
  percent: number;
  hours: number;
};

type Employee = {
  fio: string;
  surname: string;
  psu: number;
  BIQsWithPercent: BIQWithPercent[];
};

export type Inputs = {
  projectName: string;
  monthName: string;
  monthWorkHours: number;
  employees: Employee[];
};

const CoreForm = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const employeesFieldArray = useFieldArray({
    name: 'employees',
    control,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <h1 className='my-4 block text-2xl font-bold'>
        Форма создания конфигурации
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-[400px]'>
          <label
            htmlFor='projectName'
            className='text-md mt-4 block font-medium text-slate-700'
          >
            Название проекта
          </label>
          <select
            id='projectName'
            className='mt-1 block w-full appearance-none rounded-md py-2 pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            {...register('projectName')}
          >
            <option value='CORPDEV'>CORPDEV</option>
            <option value='JIRAECM'>JIRAECM</option>
            <option value='QA'>QA</option>
          </select>
        </div>

        <div className='mt-4 w-[400px]'>
          <label
            htmlFor='monthName'
            className='text-md block font-medium text-slate-700'
          >
            Название месяца
          </label>
          <select
            id='monthName'
            className='mt-1 block w-full appearance-none rounded-md py-2 pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            {...register('monthName')}
          >
            <option value='Январь'>Январь</option>
            <option value='Февраль'>Февраль</option>
            <option value='Март'>Март</option>
            <option value='Апрель'>Апрель</option>
            <option value='Май'>Май</option>
            <option value='Июнь'>Июнь</option>
            <option value='Июль'>Июль</option>
            <option value='Август'>Август</option>
            <option value='Сентябрь'>Сентябрь</option>
            <option value='Октябрь'>Октябрь</option>
            <option value='Ноябрь'>Ноябрь</option>
            <option value='Декабрь'>Декабрь</option>
          </select>
        </div>

        <div className='mt-4 w-[400px]'>
          <label
            htmlFor='monthWorkHours'
            className='text-md block font-medium text-slate-700'
          >
            Количество рабочих часов в месяце
          </label>
          <input
            type='number'
            defaultValue='160'
            id='monthWorkHours'
            className='mt-1 block w-full appearance-none rounded-md py-2 pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            {...register('monthWorkHours', {
              required: true,
              valueAsNumber: true,
            })}
          />
          <div className='mt-1 block text-red-500'>
            {errors.monthWorkHours && (
              <span>
                Нужно указать необходимое количество рабочих часов в месяце
              </span>
            )}
          </div>
        </div>

        <div className='mt-10'>
          {employeesFieldArray.fields.map(
            (employeeField, employeeFieldIndex) => {
              return (
                <div key={employeeField.id} className='mt-4'>
                  <section
                    className='flex items-end gap-4'
                    key={employeeField.id}
                  >
                    <div className='w-full'>
                      <label
                        htmlFor={`employees.${employeeFieldIndex}.fio`}
                        className='text-md block font-medium text-slate-700'
                      >
                        ФИО
                      </label>
                      <input
                        type='text'
                        id={`employees.${employeeFieldIndex}.fio`}
                        className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        {...register(
                          `employees.${employeeFieldIndex}.fio` as const,
                          {
                            required: true,
                          }
                        )}
                      />
                    </div>
                    <div className='w-full'>
                      <label
                        htmlFor={`employees.${employeeFieldIndex}.surname`}
                        className='text-md block font-medium text-slate-700'
                      >
                        Фамилия
                      </label>
                      <input
                        type='text'
                        id={`employees.${employeeFieldIndex}.surname`}
                        className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        {...register(
                          `employees.${employeeFieldIndex}.surname` as const,
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
                        type='number'
                        id={`employees.${employeeFieldIndex}.psu`}
                        className='mt-1 block h-10 w-full appearance-none rounded-md pl-4 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='% ПШЕ'
                        {...register(
                          `employees.${employeeFieldIndex}.psu` as const,
                          {
                            required: true,
                            valueAsNumber: true,
                          }
                        )}
                      />
                    </div>

                    <button
                      type='button'
                      className='h-10 rounded-md border border-red-500 px-4 text-sm leading-6 text-red-500 shadow-sm'
                      onClick={() =>
                        employeesFieldArray.remove(employeeFieldIndex)
                      }
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
            }
          )}
        </div>
        <button
          type='button'
          className='mt-10 block h-10 rounded-md border border-slate-200 px-6 font-semibold text-slate-900 shadow-sm'
          onClick={() =>
            employeesFieldArray.append({
              fio: '',
              surname: '',
              psu: 100,
              BIQsWithPercent: [],
            })
          }
        >
          Добавить сотрудника
        </button>

        <button
          type='submit'
          className='mt-8 h-10 rounded-md border border-slate-200 px-6 font-semibold text-slate-900'
        >
          Создать конфигурацию
        </button>
      </form>
    </div>
  );
};

export default CoreForm;
