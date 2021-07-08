export const formatLocalDateTime = (localDateTime) => {
  const date = localDateTime.split('T')[0];
  const time = localDateTime.split('T')[1].split('.')[0];
  return date + ' ' + time;
};
