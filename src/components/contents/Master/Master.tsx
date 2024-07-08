import { Routes, Route } from 'react-router-dom';
import { UserManagement } from './UserManagement';
import { MasterDataHome } from './MasterDataHome';
import { DataPraktek } from './DataPraktek';
import { GolonganDarah } from './GolonganDarah';
import { Pendidikan } from './Pendidikan';
import { Hubungan } from './Hubungan';
import { Pekerjaan } from './Pekerjaan';
import { JenisKB } from './JenisKB';
import { DataBidan } from './DataBidan';
import { JenisImunisasi } from './JenisImunisasi';

export const Master = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterDataHome />} />
      <Route path="data-praktek" element={<DataPraktek />} />
      <Route path="user-management" element={<UserManagement />} />
      <Route path="golongan-darah" element={<GolonganDarah />} />
      <Route path="pendidikan" element={<Pendidikan />} />
      <Route path="hubungan" element={<Hubungan />} />
      <Route path="pekerjaan" element={<Pekerjaan />} />
      <Route path="jenis-kb" element={<JenisKB />} />
      <Route path="jenis-imunisasi" element={<JenisImunisasi />} />
      <Route path="bidan" element={<DataBidan />} />
    </Routes>
  );
};
