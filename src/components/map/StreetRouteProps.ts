type StreetRouteProps = {
  origin: string;
  destination: string;
  catchNotFoundRoute?: () => void;
};

export default StreetRouteProps;
