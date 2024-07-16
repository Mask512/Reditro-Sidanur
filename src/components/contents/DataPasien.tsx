import { Route, Routes, useNavigate } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { Button } from '../ui/button';

const parentLinks = [{ href: '/', label: 'Home' }];

export const DataPasien = () => {
  const navigate = useNavigate();

  const handleAction = (id: string) => {
    return (
      <div className="flex gap-1">
        <Button
          onClick={() => navigate(`/data-pasien/edit/${id}`)}
          variant="secondary"
        >
          Edit
        </Button>
        <Button
          onClick={()=> alert(id)}
          variant="destructive"
        >
          Hapus
        </Button>
      </div>
    );
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BreadCrumb pageName="Data Pasien" parentLinks={parentLinks} />
              <PatientTable action={handleAction} />
            </>
          }
        />
      </Routes>
    </>
  );
};
