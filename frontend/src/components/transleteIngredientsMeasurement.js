export const translateIngredient = (name, measurement) => {
  return `${name} (${
    measurement === 'PIECE'
      ? 'Darab'
      : measurement === 'CUP'
      ? 'Bögre'
      : measurement === 'SPOON'
      ? 'Kanál'
      : measurement === 'VOLUME'
      ? 'Térfogat'
      : measurement === 'OTHER'
      ? 'Egyéb'
      : 'Tömeg'
  })`;
};
