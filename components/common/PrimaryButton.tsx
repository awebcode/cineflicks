import React from "react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  customColor?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type,
  isSubmitting = false,
  onClick,
  disabled = false,
  className = "",
  children,
  icon,
  size = "medium",
  fullWidth = false,
  customColor = "",
  ...props
}) => {
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const buttonClass = `${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${
    customColor ? customColor : "bg-[#F5A64C] text-black"
  } font-semibold rounded-xl hover:bg-[#E89539] transition-colors disabled:opacity-50 ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isSubmitting || disabled}
      className={buttonClass}
      {...props}
    >
      {isSubmitting ? (
        <span>Submitting...</span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
