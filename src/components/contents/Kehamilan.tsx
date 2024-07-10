import { Route, Routes } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { KehamilanForm } from './KehamilanForm';

const parentLinks = [{ href: '/', label: 'Home' }];

export const Kehamilan = () => {
  const handleAction = (id: string) => {
    return `/kehamilan/${id}`;
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BreadCrumb
                pageName="Pemeriksaan Kehamilan"
                parentLinks={parentLinks}
              />
              <PatientTable action={handleAction} />
            </>
          }
        />
        <Route path='/:patientId' element={<KehamilanForm/>}>
        </Route>
      </Routes>
    </>
  );
};
