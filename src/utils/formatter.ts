export const formatDateID = (inputDate: string) => {
  const date = new Date(inputDate);

  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.startsWith('0')
    ? '62' + phoneNumber.substring(1)
    : phoneNumber;
};
