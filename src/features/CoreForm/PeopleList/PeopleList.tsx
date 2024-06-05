import React, { memo } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Button, ConfigProvider, notification } from 'antd';
import { PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
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
  className?: string;
};

const PeopleListComponent: React.FC<Props> = ({
  peopleList,
  setPeopleList,
  className,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      people: peopleList,
    },
  });

  const [notificationAPI, notificationContextHolder] =
    notification.useNotification();

  const peopleFieldArray = useFieldArray({
    name: 'people',
    control,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setPeopleList(data.people);
    notificationAPI.success({
      message: 'Сотрудники сохранены',
      description: 'Список сорудников успешно сохранен в LocalStorage',
    });
  };

  return (
    <>
      {notificationContextHolder}
      <div className={className}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-8 flex flex-col gap-4'>
            {peopleFieldArray.fields.map((peopleListItemField, index) => (
              <PeopleListItem
                key={peopleListItemField.id}
                peopleListItemFieldIndex={index}
                control={control}
                errors={errors}
                remove={peopleFieldArray.remove}
              />
            ))}
          </div>

          <div className='flex gap-4'>
            <Button
              type='primary'
              icon={<PlusCircleOutlined />}
              onClick={() =>
                peopleFieldArray.append({
                  fio: '',
                  fioShort: '',
                  jiraLogin: '',
                  psu: 100,
                })
              }
            >
              Добавить нового сотрудника
            </Button>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: '#389e0d',
                    colorPrimaryHover: '#52c41a',
                    colorPrimaryActive: '#237804',
                  },
                },
              }}
            >
              <Button htmlType='submit' type='primary' icon={<SaveOutlined />}>
                Сохранить список сотрудников
              </Button>
            </ConfigProvider>
          </div>
        </form>
      </div>
    </>
  );
};

export const PeopleList = memo(PeopleListComponent);
