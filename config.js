import 'dotenv/config';

const num = (v, d) => (v === undefined || v === '' ? d : Number(v));

export const config = {
  port: num(process.env.PORT, 3000),
  currency: process.env.CURRENCY || 'PKR',
  taxRate: num(process.env.TAX_RATE, 0.05),
  deliveryFee: num(process.env.DELIVERY_FEE, 150),
  freeDeliveryOver: num(process.env.FREE_DELIVERY_OVER, 3000),
  dataFile: process.env.DATA_FILE || './data/db.json',
  whatsapp: process.env.WHATSAPP || '923036422192',
};
