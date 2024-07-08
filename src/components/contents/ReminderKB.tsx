import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
];

export const ReminderKB = () => {
  return (
    <>
    <BreadCrumb pageName='Pengingat KB' parentLinks={parentLinks}/>
    </>
  );
};
