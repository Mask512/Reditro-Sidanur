import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
];

export const Nifas = () => {
  return (
    <>
    <BreadCrumb pageName='Nifas' parentLinks={parentLinks}/>
    </>
  );
};
