/* eslint-disable @typescript-eslint/no-explicit-any */

export const filterProducts = (data: any[], searchTerm: string) => {
  return data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};
