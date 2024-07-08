import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
];

export const KB = () => {
  return (
    <>
    <BreadCrumb pageName='KB' parentLinks={parentLinks}/>
    </>
  );
};
