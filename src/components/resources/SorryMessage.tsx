import SleepImage from '@assets/images/sleep.png';

type Props = {
  title: string;
  message: string;
};

function SorryMessage({ title, message }: Props) {
  return (
    <div className="overflow-hidden pt-4 mx-auto w-full text-center bg-white max-w-[480px]">
      <section className="flex flex-col px-6 w-full">
        <img
          src={SleepImage}
          alt="sleep"
          className="object-contain self-center mt-24 max-w-full aspect-[1.17] w-[250px]"
        />
        <div className="self-center mt-2.5 text-base text-neutral-700">
          <h1 className="font-bold text-[19px] leading-[23px] mb-1">{title}</h1>
          <p className="text-base leading-normal">{message}</p>
        </div>
      </section>
    </div>
  );
}

export default SorryMessage;
