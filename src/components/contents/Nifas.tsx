import { Route, Routes } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { NifasForm } from './NifasForm';

const parentLinks = [{ href: '/', label: 'Home' }];

export const Nifas = () => {
  const handleAction = (id: string) => {
    return `/nifas/${id}`;
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BreadCrumb
                pageName="Pemeriksaan Nifas"
                parentLinks={parentLinks}
              />
              <PatientTable action={handleAction} />
            </>
          }
        />
        <Route path='/:patientId' element={<NifasForm/>}>
        </Route>
      </Routes>
    </>
  );
};
