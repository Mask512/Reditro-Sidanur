import { Route, Routes } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { PersalinanForm } from './PersalinanForm';

const parentLinks = [{ href: '/', label: 'Home' }];

export const Persalinan = () => {
  const handleAction = (id: string) => {
    return `/persalinan/${id}`;
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BreadCrumb
                pageName="Persalinan"
                parentLinks={parentLinks}
              />
              <PatientTable action={handleAction} />
            </>
          }
        />
        <Route path='/:patientId' element={<PersalinanForm/>}>
        </Route>
      </Routes>
    </>
  );
};
