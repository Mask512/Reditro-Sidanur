import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
];

export const Persalinan = () => {
  return (
    <>
    <BreadCrumb pageName='Persalinan' parentLinks={parentLinks}/>
    </>
  );
};
