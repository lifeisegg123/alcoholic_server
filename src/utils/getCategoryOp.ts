import { Between, Equal } from 'typeorm';

export const getCategoryOp = (category: number) => {
  if (category % 1000 === 0) {
    return Between(category, category + 1000);
  } else if (category % 100 === 0) {
    return Between(category, category + 100);
  } else if (category % 10 === 0) {
    return Between(category, category + 10);
  } else {
    return Equal(category);
  }
};
