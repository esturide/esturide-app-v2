function CenterElementsLayouts({ children }: React.PropsWithChildren) {
  return (
    <div className={'flex h-screen items-center justify-center'}>
      {children}
    </div>
  );
}

export default CenterElementsLayouts;
