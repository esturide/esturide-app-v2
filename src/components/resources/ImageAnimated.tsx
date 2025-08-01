import BackgroundAnimationResource from '@assets/images/car-animated.gif';

const ImageAnimated = () => {
  return (
    <img
      src={BackgroundAnimationResource}
      className="-auto max-w-full rounded-4xl object-contain"
      alt="Car Animated"
    />
  );
};

export default ImageAnimated;
