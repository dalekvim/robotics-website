interface IStructProps {
  title: string;
  importance: number;
}
export const Struct: React.FC<IStructProps> = ({
  title,
  importance,
  children,
}) => {
  // The line below was just used to supress an error caused by the case the where the input to switch was out of bounds.
  let renderTitle: JSX.Element = <></>;
  switch (importance) {
    case 1:
      renderTitle = <h1>{title}</h1>;
      break;
    case 2:
      renderTitle = <h2>{title}</h2>;
      break;
    case 3:
      renderTitle = <h3>{title}</h3>;
      break;
    case 4:
      renderTitle = <h4>{title}</h4>;
      break;
    case 5:
      renderTitle = <h5>{title}</h5>;
      break;
    case 6:
      renderTitle = <h6>{title}</h6>;
      break;
  }
  return (
    <>
      {renderTitle}
      {children}
    </>
  );
};
