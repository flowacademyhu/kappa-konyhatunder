import myFont from '../fonts/Montserrat-Regular.ttf';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { translateMeasurementUnits } from './translateMeasurementUnits';

export const generateShoppingListPDF = (product, ingredients) => {
  let doc = new jsPDF();
  let shoppingArr = [];
  if (ingredients === undefined) {
    product.ingredients.map((i) =>
      shoppingArr.push({
        ingredient: i.ingredient.name,
        amount: i.amount + ' ' + translateMeasurementUnits(i.unit),
      })
    );
  } else {
    let allIngredients = [...product.ingredients];
    const result = allIngredients.filter((ad) =>
      ingredients.every((fd) => fd.name !== ad.ingredient.name)
    );
    result.map((i) =>
      shoppingArr.push({
        ingredient: i.ingredient.name,
        amount: i.amount + '  ' + translateMeasurementUnits(i.unit),
      })
    );
  }

  doc.addFont(myFont, 'Montserrat-Regular', 'normal');
  doc.setFont('Montserrat-Regular');

  doc.setFontSize(22);
  doc.text(20, 20, 'Bevásárlólista');
  doc.setFontSize(16);
  doc.text(20, 35, product.name);

  doc.autoTable({
    styles: {
      fillColor: [0, 255, 0],
      textColor: [0, 0, 0],
      font: 'Montserrat-Regular',
      halign: 'center',
    },
    columnStyles: { 0: { halign: 'left' }, 1: { halign: 'left' } }, // Cells in first column centered and green
    margin: { top: 40 },
    body: shoppingArr,
    columns: [
      { header: 'Hozzávaló', dataKey: 'ingredient' },
      { header: 'Mennyiség', dataKey: 'amount' },
    ],
  });
  doc.save(`Bevasarlolista-${product.name}-KonyhaTunder.pdf`);
  doc = new jsPDF('portrait');
};

export const generateRecipePDF = (product) => {
  let doc = new jsPDF();

  doc.addFont(myFont, 'Montserrat-Regular', 'normal');
  doc.setFont('Montserrat-Regular');

  doc.setFontSize(22);
  doc.text(20, 20, product.name);

  let bodyArr = [];
  product.ingredients.map((i) =>
    bodyArr.push({
      ingredient: i.ingredient.name,
      amount: i.amount + ' ' + translateMeasurementUnits(i.unit),
    })
  );
  doc.setFontSize(16);
  doc.text(20, 35, 'Hozzávalók');

  doc.autoTable({
    styles: {
      fillColor: [0, 255, 0],
      textColor: [0, 0, 0],
      font: 'Montserrat-Regular',
      halign: 'center',
    },
    columnStyles: { 0: { halign: 'left' }, 1: { halign: 'left' } }, // Cells in first column centered and green
    margin: { top: 40 },
    body: bodyArr,
    columns: [
      { header: 'Hozzávaló', dataKey: 'ingredient' },
      { header: 'Mennyiség', dataKey: 'amount' },
    ],
  });
  doc.setFontSize(16);
  doc.text(20, 75 + bodyArr.length * 6, 'Elkészítés');

  doc.setFontSize(12);

  var splitTitle = doc.splitTextToSize(product.description, 150);

  doc.text(20, 80 + bodyArr.length * 6, splitTitle);

  doc.save(`${product.name}-KonyhaTunder.pdf`);
  doc = new jsPDF('portrait');
};
