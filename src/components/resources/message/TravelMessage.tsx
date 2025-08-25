import TravelSource from '@assets/svg/travel.svg';

type Props = {
  title: string;
  message: string;
};

function TravelMessage({ title, message }: Props) {
  return (
    <div className="flex flex-col items-center px-6 my-3 pb-8">
      <img
        src={TravelSource}
        alt="Ilustración de estado vacío mostrando que no hay viajes en la lista"
        className="object-contain max-w-full aspect-[1.25] w-[250px]"
      />
      <section className="mt-2.5 text-xl font-bold text-center text-neutral-700">
        <h1 className="text-[#3d3d3d]">{title}</h1>
        <p className="font-normal text-base leading-[19px] text-[#3d3d3d] mt-1">
          {message}
        </p>
      </section>
    </div>
  );
}

export default TravelMessage;
