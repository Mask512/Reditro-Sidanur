import { Route, Routes, useNavigate } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { PersalinanForm } from './PersalinanForm';
import { Button } from '../ui/button';

const parentLinks = [{ href: '/', label: 'Home' }];

const Persalinan = () => {
  const navigate = useNavigate();

  const handleAction = (id: string) => {
    return (
      <Button onClick={() => navigate(`/persalinan/${id}`)}>Periksa</Button>
    );
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BreadCrumb pageName="Persalinan" parentLinks={parentLinks} />
              <PatientTable action={handleAction} />
            </>
          }
        />
        <Route path="/:patientId" element={<PersalinanForm />}></Route>
      </Routes>
    </>
  );
};

export default Persalinan;
