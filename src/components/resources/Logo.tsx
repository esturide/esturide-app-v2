import LogoResource from '@assets/images/logo.png';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="relative h-[50px] w-[123px]">
      <Image
        src={LogoResource}
        alt="Esturide logo"
        fill
        className="object-contain"
        sizes="123px"
        priority
      />
    </div>
  );
};

export default Logo;
