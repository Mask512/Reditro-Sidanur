export const getLastRMNum = (num: number): string => {
  const totalDigits = 5;
  const nextNumber = num + 1;
  const formattedNum = nextNumber.toString().padStart(totalDigits, '0');

  return `RM-${formattedNum}`;
};
