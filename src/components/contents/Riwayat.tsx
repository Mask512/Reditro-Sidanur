import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
];

export const Riwayat = () => {
  return (
    <>
    <BreadCrumb pageName='Riwayat Medis' parentLinks={parentLinks}/>
    </>
  );
};
