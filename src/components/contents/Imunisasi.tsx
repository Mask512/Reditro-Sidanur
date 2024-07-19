import { Route, Routes, useNavigate } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { ImunisasiForm } from './ImunisasiForm';
import { Button } from '../ui/button';

const parentLinks = [{ href: '/', label: 'Home' }];

const Imunisasi = () => {
  const navigate = useNavigate();

  const handleAction = (id: string) => {
    return (
      <Button onClick={() => navigate(`/imunisasi/${id}`)}>Periksa</Button>
    );
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BreadCrumb pageName="Imunisasi" parentLinks={parentLinks} />
              <PatientTable action={handleAction} />
            </>
          }
        />
        <Route path="/:patientId" element={<ImunisasiForm />}></Route>
      </Routes>
    </>
  );
};

export default Imunisasi;