import { Route, Routes, useNavigate } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { KehamilanForm } from './KehamilanForm';
import { Button } from '../ui/button';

const parentLinks = [{ href: '/', label: 'Home' }];

export const Kehamilan = () => {
  const navigate = useNavigate();
  
  const handleAction = (id: string) => {
    return (
      <Button onClick={() => navigate(`/kehamilan/${id}`)}>Periksa</Button>
    );
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
        <Route path="/:patientId" element={<KehamilanForm />}></Route>
      </Routes>
    </>
  );
};
