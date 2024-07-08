import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
];

export const Imunisasi = () => {
  return (
    <>
    <BreadCrumb pageName='Imunisasi' parentLinks={parentLinks}/>
    </>
  );
};
