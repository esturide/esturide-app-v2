import LogoResource from '@assets/images/logo.png';

const Logo = () => {
  return (
    <img
      src={LogoResource}
      className="w-[123px] aspect-[0.99] object-contain"
      alt="Esturide logo"
    />
  );
};

export default Logo;
