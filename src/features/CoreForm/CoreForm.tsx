import { useState, useEffect } from 'react';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from 'react-hook-form';
import { Collapse, Alert } from 'antd';
import dayjs from 'dayjs';
import { EmployeeInput } from './EmployeeInput/EmployeeInput';
import { JSONPreview } from './JSONPreview/JSONPreview';
import { PeopleList } from './PeopleList/PeopleList';
import { BIQsList } from './BIQsList/BIQsList';
import { SelectField } from '@/common/components/SelectField/SelectField';
import { InputField } from '@/common/components/InputField/InputField';
import { DatePickerField } from '@/common/components/DatePickerField/DatePickerField';
import { setLocalStorage, getLocalStorage } from '@/utils/localStorageUtils';
import { capitalize } from '@/utils/textUtils';
import projectNames from '@/common/contstants/projectNames';
import 'highlight.js/styles/github.css';

import type { Inputs } from './CoreForm.types';
import type { PeopleListItem } from './PeopleList/PeopleList';
import type { BIQsListItem } from './BIQsList/BIQsList';

const CoreForm = () => {
  // get form result from localStorage
  const coreFormDataFromLocalStorage = getLocalStorage('coreFormData');
  let defaultCoreFormData: Inputs = {
    projectName: projectNames[0].value,
    planningStartDate: dayjs().format(),
    monthWorkHours: 0,
    employees: [],
  };
  if (coreFormDataFromLocalStorage) {
    defaultCoreFormData = JSON.parse(coreFormDataFromLocalStorage);
    defaultCoreFormData.planningStartDate =
      defaultCoreFormData.planningStartDate
        ? dayjs(defaultCoreFormData.planningStartDate).format()
        : dayjs().format();
  }

  // get people list from localStorage
  const peopleListFromLocalStorage = getLocalStorage('peopleList');
  let defaultPeopleList: PeopleListItem[] = [];
  if (peopleListFromLocalStorage) {
    defaultPeopleList = JSON.parse(peopleListFromLocalStorage);
  }

  // get BIQs list from localStorage
  const BIQsListFromLocalStorage = getLocalStorage('BIQsList');
  let defaultBIQsList: BIQsListItem[] = [];
  if (BIQsListFromLocalStorage) {
    defaultBIQsList = JSON.parse(BIQsListFromLocalStorage);
  }

  const [tasksJsonConfig, setTasksJsonConfig] = useState<string>('{}');
  const [peopleList, setPeopleList] =
    useState<PeopleListItem[]>(defaultPeopleList);
  const [biqsList, setBiqsList] = useState<BIQsListItem[]>(defaultBIQsList);

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

  // sync BIQsList with localStorage
  useEffect(() => {
    setLocalStorage('BIQsList', JSON.stringify(biqsList));
  }, [biqsList]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('DATA', data);
    // write form result to localStorage
    setLocalStorage('coreFormData', JSON.stringify(data));

    const tasksConfig = {
      tasks: data.employees
        .map((employee) => {
          return employee.BIQsWithPercent.map((BIQWithPercent) => {
            const planningStartDt = new Date(data.planningStartDate);
            const fullYear = planningStartDt.getFullYear();
            const localeMonth = capitalize(
              planningStartDt.toLocaleDateString('ru-RU', {
                month: 'long',
              })
            );

            return {
              project: data.projectName,
              assignee: employee.jiraLogin,
              summary: `${employee.fioShort} : ${BIQWithPercent.BIQ} : ${fullYear} ${localeMonth}`,
              priority: 'Lowest',
              planningStartDt: dayjs(planningStartDt).format('YYYY-MM-DD'),
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
      <Alert
        message='Внимание!'
        description={
          <span>
            Перед началом заполнения формы необходимо актуализировтаь{' '}
            <strong>Список сотрудников</strong> и <strong>Список БИКов</strong>
          </span>
        }
        type='warning'
        showIcon
        closable
        className='mb-4'
      />

      <Collapse
        items={[
          {
            key: '1',
            label: 'Список сотрудников',
            children: (
              <PeopleList
                peopleList={peopleList}
                setPeopleList={setPeopleList}
              />
            ),
          },
        ]}
      />

      <Collapse
        className='mt-4'
        items={[
          {
            key: '1',
            label: 'Список БИКов',
            children: (
              <BIQsList biqsList={biqsList} setBiqsList={setBiqsList} />
            ),
          },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
        <h2 className='py-4 text-xl font-bold'>Форма планирования списаний</h2>

        <div className='mb-4 flex gap-4'>
          <div className='grow'>
            <Controller
              control={control}
              name='projectName'
              rules={{
                required: 'Не указано название проекта',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectField
                  error={errors.projectName}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  label='Названиие проекта'
                  options={projectNames}
                  id='projectName'
                  showSearch
                />
              )}
            />
          </div>

          <div className='grow'>
            <Controller
              control={control}
              name='planningStartDate'
              rules={{
                required: 'Пожалуйста, выберите плановую дату начала',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePickerField
                  error={errors.planningStartDate}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={dayjs(value)}
                  label='Плановая дата начала'
                  id='planningStartDate'
                />
              )}
            />
            {/* <label
              htmlFor='planningStartDate'
              className='text-md block font-medium text-slate-700'
            >
              Плановая дата начала
            </label>
            <input
              type='date'
              id='planningStartDate'
              className='w-full rounded-md border border-gray-300 p-2'
              {...register('planningStartDate', {
                required: true,
              })}
            />
            <div className='mt-1 block text-red-500'>
              {errors.planningStartDate && (
                <span>
                  {errors.planningStartDate.message ||
                    'Пожалуйста, выберите плановую дату начала'}
                </span>
              )}
            </div> */}
          </div>

          <div className='grow'>
            <InputField
              type='number'
              label='Количество рабочих часов в месяце'
              control={control}
              name='monthWorkHours'
              rules={{
                required: {
                  value: true,
                  message:
                    'Нужно указать необходимое количество рабочих часов в месяце',
                },
                valueAsNumber: true,
              }}
              error={errors.monthWorkHours}
            />
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
                peopleList={peopleList}
                biqsList={biqsList}
              />
            )
          )}
        </div>

        {employeesFieldArray.fields.length < peopleList.length ? (
          <button
            type='button'
            className='mt-10 block h-10 rounded-md border border-slate-200 px-6 font-semibold text-slate-900 shadow-sm'
            onClick={() =>
              employeesFieldArray.append({
                fio: '',
                fioShort: '',
                jiraLogin: '',
                psu: 100,
                BIQsWithPercent: [],
              })
            }
          >
            Добавить план сотрудника
          </button>
        ) : (
          <div className='mt-6 text-lg font-semibold text-green-500'>
            Вы добавили план для всех сотрудников из списка!
          </div>
        )}

        <button
          type='submit'
          className='mt-8 rounded-md bg-green-500 px-4 py-2 font-semibold text-white shadow-sm hover:bg-green-400'
        >
          Создать конфигурацию
        </button>
      </form>

      <JSONPreview json={tasksJsonConfig} />
    </div>
  );
};

export default CoreForm;
