import SleepImage from '@assets/images/sleep.png';

type Props = {
  title: string;
  message: string;
  shadow?: boolean;
  dark?: boolean;
};

function SorryMessage({ title, message, shadow = false, dark = false }: Props) {
  return (
    <div
      className={`overflow-hidden pt-4 mx-auto w-full text-center max-w-[480px] rounded-xl ${shadow ? '' : ''}`}
    >
      <section className="flex flex-col px-6 w-full">
        <img
          src={SleepImage}
          alt="sleep"
          className="object-contain self-center mt-12 max-w-full aspect-[1.17] w-[250px] rounded-4xl inset-shadow-sm"
        />
        <div
          className={`self-center pt-2 pb-12 mt-2.5 text-base text-neutral-700 ${dark ? 'text-white' : 'text-black'}`}
        >
          <h1 className="font-bold text-[19px] leading-[23px] mb-1">{title}</h1>
          <p className="text-base leading-normal">{message}</p>
        </div>
      </section>
    </div>
  );
}

export default SorryMessage;
