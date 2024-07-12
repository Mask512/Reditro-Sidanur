import { Route, Routes } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { ImunisasiForm } from './ImunisasiForm';

const parentLinks = [{ href: '/', label: 'Home' }];

export const Imunisasi = () => {
  const handleAction = (id: string) => {
    return `/imunisasi/${id}`;
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BreadCrumb
                pageName="Imunisasi"
                parentLinks={parentLinks}
              />
              <PatientTable action={handleAction} />
            </>
          }
        />
        <Route path='/:patientId' element={<ImunisasiForm/>}>
        </Route>
      </Routes>
    </>
  );
};
