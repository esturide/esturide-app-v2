type Props = {
  dark?: boolean;
};

const Welcome = ({ dark = false }: Props) => {
  const textStyle = !dark ? 'text-black' : 'text-white';

  return (
    <>
      <div>
        <div className={'mx-auto max-w-2xl lg:mx-0'}>
          <h2
            className={`text-2xl font-semibold tracking-tight ${textStyle} sm:text-5xl`}
          >
            Bienvenido a
          </h2>
          <h1
            className={`text-5xl font-semibold tracking-tight ${textStyle} sm:text-7xl`}
          >
            Esturide
          </h1>
        </div>
      </div>
    </>
  );
};

export default Welcome;
