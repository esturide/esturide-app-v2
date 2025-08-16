import TravelSource from '@assets/svg/travel.svg';

function ScheduleTravelMessage() {
  return (
    <div className="flex flex-col items-center px-6 my-3">
      <img
        src={TravelSource}
        alt="Ilustración de estado vacío mostrando que no hay viajes en la lista"
        className="object-contain max-w-full aspect-[1.25] w-[250px]"
      />
      <section className="mt-2.5 text-xl font-bold text-center text-neutral-700">
        <h1 className="text-[#3d3d3d]">Aún no tienes viajes en tu lista.</h1>
        <p className="font-normal text-base leading-[19px] text-[#3d3d3d] mt-1">
          Toca el botón '+' para crear un nuevo viaje.
        </p>
      </section>
    </div>
  );
}

export default ScheduleTravelMessage;
