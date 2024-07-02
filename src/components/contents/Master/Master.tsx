import { Routes, Route } from 'react-router-dom';
import { UserManagement } from './UserManagement';
import { MasterDataHome } from './MasterDataHome';

export const Master = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterDataHome />} />
      <Route path="user-management" element={<UserManagement />} />
    </Routes>
  );
};
