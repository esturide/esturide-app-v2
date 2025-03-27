type StyleButton =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

type Props = {
  label: string;
  onPress?: () => Promise<void>;
  style?: StyleButton;
};

export default function ({ label, onPress, style = 'primary' }: Props) {
  return (
    <>
      <button className={`btn btn-${style}`} onClick={onPress}>
        {label}
      </button>
    </>
  );
}
