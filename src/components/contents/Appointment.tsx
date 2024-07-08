import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
];

export const Appointment = () => {
  return (
    <>
    <BreadCrumb pageName='Appointment' parentLinks={parentLinks}/>
    </>
  );
};
