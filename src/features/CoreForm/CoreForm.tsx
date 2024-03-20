import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { EmployeeInput } from './EmployeeInput/EmployeeInput';
import { JSONPreview } from './JSONPreview/JSONPreview';
import { PeopleList } from './PeopleList/PeopleList';
import { SelectField } from '../../common/components/SelectField/SelectField';
import {
  setLocalStorage,
  getLocalStorage,
} from '../../utils/localStorageUtils';
import projectNames from '../../common/contstants/projectNames';
import 'highlight.js/styles/github.css';

import type { Inputs } from './CoreForm.types';
import type { PeopleListItem } from './PeopleList/PeopleList';

const CoreForm = () => {
  // get form result from localStorage
  const coreFormDataFromLocalStorage = getLocalStorage('coreFormData');
  let defaultCoreFormData: Inputs = {
    projectName: '',
    monthName: '',
    monthWorkHours: 0,
    employees: [],
  };
  if (coreFormDataFromLocalStorage) {
    defaultCoreFormData = JSON.parse(coreFormDataFromLocalStorage);
  }

  // get people list from localStorage
  const peopleListFromLocalStorage = getLocalStorage('peopleList');
  let defaultPeopleList: PeopleListItem[] = [];
  if (peopleListFromLocalStorage) {
    defaultPeopleList = JSON.parse(peopleListFromLocalStorage);
  }

  const [tasksJsonConfig, setTasksJsonConfig] = useState<string>('{}');
  const [peopleList, setPeopleList] =
    useState<PeopleListItem[]>(defaultPeopleList);
  const [showPeopleList, setShowPeopleList] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: defaultCoreFormData,
  });

  const employeesFieldArray = useFieldArray({
    name: 'employees',
    control,
  });

  // sync peopleList with localStorage
  useEffect(() => {
    setLocalStorage('peopleList', JSON.stringify(peopleList));
  }, [peopleList]);

  const handleShowPeopleList = () => {
    setShowPeopleList(!showPeopleList);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // write form result to localStorage
    setLocalStorage('coreFormData', JSON.stringify(data));

    const tasksConfig = {
      tasks: data.employees
        .map((employee) => {
          return employee.BIQsWithPercent.map((BIQWithPercent) => {
            return {
              project: data.projectName,
              assignee: employee.jiraLogin,
              summary: `${employee.surname} : ${BIQWithPercent.BIQ} : ${new Date().getFullYear()} ${data.monthName}`,
              priority: 'Lowest',
              planningStartDt: '2024-03-01',
              plannedHours: BIQWithPercent.hours,
              BIQ: BIQWithPercent.BIQ,
            };
          });
        })
        .flat(),
    };
    setTasksJsonConfig(JSON.stringify(tasksConfig, null, 2));
  };

  return (
    <div>
      {showPeopleList && (
        <PeopleList peopleList={peopleList} setPeopleList={setPeopleList} />
      )}
      <button
        type='button'
        className='mt-8 h-10 rounded-md border border-slate-200 px-6 font-semibold text-slate-900'
        onClick={handleShowPeopleList}
      >
        {showPeopleList
          ? 'Скрыть список сотрудников'
          : 'Показать список сотрудников'}
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-[400px]'>
          <SelectField
            label='Названиие проекта'
            options={projectNames}
            id='projectName'
            error={errors.projectName}
            {...register('projectName')}
          />
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
            (employeeField, employeeFieldIndex) => (
              <EmployeeInput
                key={employeeField.id}
                employeeFieldIndex={employeeFieldIndex}
                register={register}
                errors={errors}
                remove={employeesFieldArray.remove}
                setValue={setValue}
                control={control}
              />
            )
          )}
        </div>

        <button
          type='button'
          className='mt-10 block h-10 rounded-md border border-slate-200 px-6 font-semibold text-slate-900 shadow-sm'
          onClick={() =>
            employeesFieldArray.append({
              fio: '',
              surname: '',
              jiraLogin: '',
              psu: 100,
              BIQsWithPercent: [],
            })
          }
        >
          Добавить план сотрудника
        </button>

        <button
          type='submit'
          className='mt-8 h-10 rounded-md border border-slate-200 px-6 font-semibold text-slate-900'
        >
          Создать конфигурацию
        </button>
      </form>

      <JSONPreview json={tasksJsonConfig} />
    </div>
  );
};

export default CoreForm;
