import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
];

export const Anamnesis = () => {
  return (
    <>
    <BreadCrumb pageName='Anamnesis' parentLinks={parentLinks}/>
    </>
  );
};
