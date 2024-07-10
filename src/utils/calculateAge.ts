export const calculateAge = (birthDate: string) => {
  const today = new Date();

  const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number);

  let ageYears = today.getFullYear() - birthYear;
  let ageMonths = today.getMonth() - birthMonth;
  let ageDays = today.getDate() - birthDay;

  if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDay)) {
    ageYears--;
    ageMonths = 12 + today.getMonth() - birthMonth;
  }
  if (ageDays < 0) {
    const prevMonthLastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();
    ageMonths--;
    ageDays = prevMonthLastDay + ageDays;
  }

  let ageString = '';
  if (ageYears > 0) {
    ageString += `${ageYears} tahun `;
  }
  if (ageMonths > 0) {
    ageString += `${ageMonths} bulan `;
  }
  if (ageDays > 0) {
    ageString += `${ageDays} hari`;
  }

  return ageString.trim();
};
