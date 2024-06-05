import React, { memo } from 'react';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { Input } from 'antd';

import type { Control, RegisterOptions, FieldError } from 'react-hook-form';
import type { InputProps } from 'antd/es/input/Input';

interface Props extends InputProps {
  name: string;
  rules?: RegisterOptions;
  control: Control<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  className?: string;
  label?: string | React.ReactNode;
  error?: FieldError;
}

const InputFieldComponent: React.FC<Props> = ({
  name,
  rules,
  control,
  className,
  label,
  error,
  ...rest
}) => {
  const calculatedClassName = classNames(className);

  return (
    <div className={calculatedClassName}>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-medium text-slate-700'
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error: fieldError },
        }) => (
          <Input
            className='mt-1'
            id={name}
            onChange={(e) => {
              const value = e.target.value;
              if (rules?.valueAsNumber) {
                onChange(Number(value));
              } else {
                onChange(value);
              }
            }}
            onBlur={onBlur}
            value={value}
            ref={ref}
            status={fieldError ? 'error' : undefined}
            {...rest}
          />
        )}
      />
      {error && (
        <div className='mt-1 text-sm text-red-500'>{error.message}</div>
      )}
    </div>
  );
};

export const InputField = memo(InputFieldComponent);
