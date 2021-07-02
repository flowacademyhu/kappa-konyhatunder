const units = {
  CUP: 'bögre',
  G: 'gramm',
  DKG: 'dekagramm',
  KG: 'kilogramm',
  CL: 'centiliter',
  ML: 'milliliter',
  DL: 'deciliter',
  L: 'liter',
  PINCH: 'csipet',
  PACKAGE: 'csomag',
  PIECE: 'darab',
  TABLE_SPOON: 'evőkanál',
  TEA_SPOON: 'teáskanál',
  COFFEE_SPOON: 'kávéskanál',
};

export const translateMeasurementUnits = (unit) => {
  return units[unit] ?? 'Ismeretlen mértékegység!';
};
