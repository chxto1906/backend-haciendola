import { Seeders } from '../src/umzug';
import { ProductsModel } from '@Products';
const xlsx = require("xlsx");

interface FileData {
  'Handle': string;
  'Title': string;
  'Description': string;
  'SKU': string;
  'Grams': number;
  'Stock': number;
  'Price': number;
  'Compare Price': number;
  'Barcode': string;
}

export const up: Seeders = async ({ context: _queryInterface }) => {
  try {
    var workbook = xlsx.readFile(__dirname + "/products.xlsx");
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const options = { defval: '' };
    const json: FileData[] = xlsx.utils.sheet_to_json(worksheet, options);
    for (const data of json) {
      const product = await ProductsModel.findOne({ where: { title: data.Title } });
      if (product) continue;
      await ProductsModel.create({
        handle: data.Handle,
        title: data.Title,
        description: data.Description,
        sku: data.SKU,
        grams: data.Grams,
        stock: data.Stock,
        price: data.Price,
        comparePrice: data['Compare Price'],
        barcode: data.Barcode
      });
    }
    
    console.info('Se hizo la seeder exitósamente', __filename);
  } catch (error: any) {
    console.error(error.message, __filename);
  }
};

export const down: Seeders = async ({ context: _queryInterface }) => {};