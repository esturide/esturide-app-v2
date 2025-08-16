import '@styles/button/GlassButton.scss';

type Props = {
  label: string;
  opacity?: number;
  saturate?: number;
  contrast?: number;
  onClick?: () => Promise<void>;
};

function GlassButton({
  label,
  opacity = 50,
  saturate = 0,
  contrast = 0,
  onClick = async () => {},
}: Props) {
  if (opacity < 0 || saturate < 0 || contrast < 0) {
    throw 'Invalid values for styles.';
  }

  return (
    <button
      onClick={onClick}
      className={`self-stretch px-11 py-4 rounded-b-xl rounded-tl-xl w-full text-white bg-teal-800/80 focus:bg-teal-800/50 focus:ring-teal-200/30 transition-colors bg-opacity-${opacity} backdrop-saturate-${saturate} backdrop-contrast-${contrast} shadow-lg ring-1 ring-black/5 `}
    >
      <div>{label}</div>
    </button>
  );
}

export default GlassButton;
