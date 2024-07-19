import { Route, Routes, useNavigate } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { NifasForm } from './NifasForm';
import { Button } from '@/components/ui/button';

const parentLinks = [{ href: '/', label: 'Home' }];

const Nifas = () => {
  const navigate = useNavigate();
  const handleAction = (id: string) => {
    return <Button onClick={() => navigate(`/nifas/${id}`)}>Periksa</Button>;
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
        <Route path="/:patientId" element={<NifasForm />}></Route>
      </Routes>
    </>
  );
};

export default Nifas;
