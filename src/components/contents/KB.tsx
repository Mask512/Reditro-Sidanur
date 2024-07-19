import { Route, Routes, useNavigate } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { KBForm } from './KBForm';
import { Button } from '../ui/button';

const parentLinks = [{ href: '/', label: 'Home' }];

const KB = () => {
  const navigate = useNavigate();
  const handleAction = (id: string) => {
    return <Button onClick={() => navigate(`/kb/${id}`)}>Periksa</Button>;
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
        <Route path="/:patientId" element={<KBForm />}></Route>
      </Routes>
    </>
  );
};

export default KB;
