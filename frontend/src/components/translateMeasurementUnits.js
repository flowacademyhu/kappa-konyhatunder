export const translateMeasurementUnits = (unit) => {
  switch (unit) {
    case 'CUP':
      return 'bögre';
    case 'G':
      return 'gramm';
    case 'DKG':
      return 'dekagramm';
    case 'KG':
      return 'kilogramm';
    case 'CL':
      return 'centiliter';
    case 'ML':
      return 'milliliter';
    case 'DL':
      return 'deciliter';
    case 'L':
      return 'liter';
    case 'PINCH':
      return 'csipet';
    case 'PACKAGE':
      return 'csomag';
    case 'PIECE':
      return 'darab';
    case 'TABLE_SPOON':
      return 'evőkanál';
    case 'TEA_SPOON':
      return 'teáskanál';
    case 'COFFEE_SPOON':
      return 'kávéskanál';
    default:
      return 'Ismeretlen mértékegység!';
  }
};
