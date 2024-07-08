import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
];

export const Kehamilan = () => {
  return (
    <>
    <BreadCrumb pageName='Kehamilan' parentLinks={parentLinks}/>
    </>
  );
};
