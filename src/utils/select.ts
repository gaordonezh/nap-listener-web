export const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const filterOptions = (inputValue: string, option: any) => {
  const title = removeAccents(option.props.title.toLowerCase());
  return title.includes(inputValue.toLowerCase());
};
