import { Between, Equal } from 'typeorm';

export const getCategoryOp = (category: number) => {
  if (category % 1000 === 0) {
    return Between(category, category + 999);
  } else if (category % 100 === 0) {
    return Between(category, category + 99);
  } else if (category % 10 === 0) {
    return Between(category, category + 9);
  } else {
    return Equal(category);
  }
};
