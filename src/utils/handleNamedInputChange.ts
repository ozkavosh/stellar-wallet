const handleNamedInputChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setValues: React.Dispatch<React.SetStateAction<any>>
) => {
  const { name, value } = event.target;
  setValues((prev: React.SetStateAction<any>) => ({ ...prev, [name]: value }));
};

export default handleNamedInputChange;
