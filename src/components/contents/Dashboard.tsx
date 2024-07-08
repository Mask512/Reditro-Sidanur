import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
];

export const Dashboard = () => {
  return (
    <>
    <BreadCrumb pageName='Dashboard' parentLinks={parentLinks}/>
    </>
  );
};
