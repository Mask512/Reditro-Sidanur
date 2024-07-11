import { Route, Routes } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { KBForm } from './KBForm';

const parentLinks = [{ href: '/', label: 'Home' }];

export const KB = () => {
  const handleAction = (id: string) => {
    return `/kb/${id}`;
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BreadCrumb
                pageName="Keluarga Berencana"
                parentLinks={parentLinks}
              />
              <PatientTable action={handleAction} />
            </>
          }
        />
        <Route path='/:patientId' element={<KBForm/>}>
        </Route>
      </Routes>
    </>
  );
};
