import ColorTheme from '$libs/types/theme.ts';

type Props = {
  label: string;
  theme?: ColorTheme;
  onClick?: () => Promise<void>;
  disabled?: boolean;
  className?: string;
};

function SmallButton({
  label,
  theme = 'teal',
  onClick,
  disabled = false,
  className = '',
}: Props) {
  const getThemeClasses = () => {
    if (disabled) {
      return 'bg-gray-500 hover:bg-gray-500 focus:ring-gray-400';
    }

    switch (theme) {
      case 'indigo':
        return 'bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-500';
      case 'teal':
      default:
        return 'bg-teal-700 hover:bg-teal-800 focus:ring-teal-500';
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex overflow-hidden gap-2.5 justify-center items-center py-2 pr-6 pl-6 text-xl font-bold text-white whitespace-nowrap rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${getThemeClasses()} ${className}`}
      aria-label={label}
    >
      <span className="self-stretch my-auto text-white">{label}</span>
    </button>
  );
}

export default SmallButton;
