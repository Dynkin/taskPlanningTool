import React, { memo } from 'react';
import classNames from 'classnames';
import { Select } from 'antd';
import { defaultSelectFilterOption } from '@/utils/inputUtils';

import type { FieldError } from 'react-hook-form';

type Props = {
  options: { value: string; label: string }[];
  label: string;
  id?: string;
  className?: string;
  error?: FieldError | undefined;
  showSearch?: boolean;
  onChange: (event: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onBlur?: () => void;
  value?: string;
  filterOption?: (
    inputValue: string,
    option?: { label: string; value: number | string }
  ) => boolean;
};

const SelectFieldComponent: React.FC<Props> = ({
  options,
  id,
  className,
  label,
  error,
  onChange,
  showSearch = false,
  filterOption = defaultSelectFilterOption,
  ...props
}) => {
  const onChangeHandler = (value: string) => {
    onChange({ target: { value } });
  };

  const computedClassName = classNames(className, 'w-full');
  return (
    <div>
      <label
        htmlFor={id}
        className='text-md mt-4 block font-medium text-slate-700'
      >
        {label}
      </label>
      <Select
        {...props}
        className={computedClassName}
        id={id}
        options={options}
        onChange={onChangeHandler}
        showSearch={showSearch}
        filterOption={showSearch ? filterOption : undefined}
      />
      <div className='mt-1 block text-red-500'>
        {error && (
          <span>{error.message || 'Пожалуйста, выберите значение'}</span>
        )}
      </div>
    </div>
  );
};

SelectFieldComponent.displayName = 'SelectFieldComponent';

export const SelectField = memo(SelectFieldComponent);
