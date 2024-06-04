import React, { memo } from 'react';
import classNames from 'classnames';
import { DatePicker, ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

import type { FieldError } from 'react-hook-form';
import type { Dayjs } from 'dayjs';

type Props = {
  label: string;
  id?: string;
  className?: string;
  error?: FieldError | undefined;
  onChange: (event: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onBlur?: () => void;
  value?: Dayjs;
};

const DatePickerFieldComponent: React.FC<Props> = ({
  id,
  className,
  label,
  error,
  onChange,
  onBlur,
  value,
  ...props
}) => {
  const onChangeHandler = (value: Dayjs) => {
    onChange({ target: { value: dayjs(value).format() } });
  };

  const computedClassName = classNames(className, 'w-full', 'mt-1');

  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-slate-700'>
        {label}
      </label>
      <ConfigProvider locale={locale}>
        <DatePicker
          {...props}
          className={computedClassName}
          id={id}
          onChange={onChangeHandler}
          onBlur={onBlur}
          value={value}
          format='DD.MM.YYYY'
        />
      </ConfigProvider>
      <div className='mt-1 block text-red-500'>
        {error && <span>{error.message || 'Пожалуйста, выберите дату'}</span>}
      </div>
    </div>
  );
};

DatePickerFieldComponent.displayName = 'DatePickerFieldComponent';

export const DatePickerField = memo(DatePickerFieldComponent);
