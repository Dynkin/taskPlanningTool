import { memo, forwardRef } from 'react';
import classNames from 'classnames';

import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';

type ExternalProps = UseFormRegisterReturn<string>;
type InternalProps = {
  options: { value: string; label: string }[];
  label: string;
  id?: string;
  className?: string;
  error?: FieldError | undefined;
};
type Props = ExternalProps & InternalProps;
type Ref = HTMLSelectElement;

const SelectFieldComponent = forwardRef<Ref, Props>(
  ({ options, id, className, label, error, ...props }, ref) => {
    const computedClassName = classNames(
      className,
      'w-full rounded-md border border-gray-300 p-2'
    );
    return (
      <div>
        <label
          htmlFor={id}
          className='text-md mt-4 block font-medium text-slate-700'
        >
          {label}
        </label>
        <select className={computedClassName} id={id} ref={ref} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className='mt-1 block text-red-500'>
          {error && (
            <span>{error.message || 'Пожалуйста, выберите значение'}</span>
          )}
        </div>
      </div>
    );
  }
);

SelectFieldComponent.displayName = 'SelectFieldComponent';

export const SelectField = memo(SelectFieldComponent);
