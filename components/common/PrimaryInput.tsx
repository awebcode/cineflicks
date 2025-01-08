import React from "react";
import { FieldValues, UseFormRegister, FieldError } from "react-hook-form";

interface PrimaryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  errors: Record<string, FieldError>;
  className?: string;
  autoFocus?: boolean;
  tooltip?: string;
  disabled?: boolean;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  label,
  name,
  placeholder,
  type,
  register,
  errors,
  className = "",
  autoFocus = false,
  tooltip,
  disabled = false,
  ...props
}) => {
  return (
    <div className={`flex-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
        {label}
        {tooltip && (
          <span
            className="ml-1 text-xs text-gray-500"
            data-tooltip={tooltip}
            aria-label={tooltip}
          >
            &#9432;
          </span>
        )}
      </label>
      <input
        {...register(name)}
        id={name}
        type={type}
        autoFocus={autoFocus}
        disabled={disabled}
        className="w-full mt-2 px-6 py-4 bg-[#1E1E1E] border border-[#F5A64C] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A64C] focus:ring-opacity-50 transition-all"
        placeholder={placeholder}
        {...props}
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default PrimaryInput;
