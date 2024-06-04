import React, { memo } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Button, ConfigProvider, notification } from 'antd';
import { PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { BIQsListItem } from './BIQsListItem/BIQsListItem';

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

  const [notificationAPI, notificationContextHolder] =
    notification.useNotification();

  const BIQsFieldArray = useFieldArray({
    name: 'BIQs',
    control,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setBiqsList(data.BIQs);
    notificationAPI['success']({
      message: 'БИКи сохранены',
      description: 'Список БИКов успешно сохранен в LocalStorage',
    });
  };

  return (
    <>
      {notificationContextHolder}
      <div className={className}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-8 flex flex-col gap-4'>
            {BIQsFieldArray.fields.map((BIQsListItemField, index) => (
              <BIQsListItem
                key={BIQsListItemField.id}
                BIQsListItemFieldIndex={index}
                control={control}
                errors={errors}
                remove={BIQsFieldArray.remove}
              />
            ))}
          </div>

          <div className='flex gap-4'>
            <Button
              type='primary'
              icon={<PlusCircleOutlined />}
              onClick={() =>
                BIQsFieldArray.append({
                  BIQTaskId: '',
                  BIQTaskSummary: '',
                })
              }
            >
              Добавить новый БИК
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
                Сохранить список БИКов
              </Button>
            </ConfigProvider>
          </div>
        </form>
      </div>
    </>
  );
};

export const BIQsList = memo(BIQsListComponent);
