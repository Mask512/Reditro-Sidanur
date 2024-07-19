import { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { APP } from './data/app';
import { RootState } from './store/store';
import { SideNav } from '@/components/SideNav';
import { TopBar } from '@/components/TopBar';
import { Dashboard } from '@/components/contents/Dashboard';

const Login = lazy(() => import('./pages/Login'));
const Activate = lazy(() => import('./pages/Activate'));
const Register = lazy(() => import('./components/contents/Register'));
const Kehamilan = lazy(() => import('./components/contents/Kehamilan'));
const Nifas = lazy(() => import('./components/contents/Nifas'));
const KB = lazy(() => import('./components/contents/KB'));
const Imunisasi = lazy(() => import('./components/contents/Imunisasi'));
const Persalinan = lazy(() => import('./components/contents/Persalinan'));
const Pengingat = lazy(() => import('./components/contents/Pengingat'));
const RiwayatKB = lazy(() => import('./components/contents/Riwayat/RiwayatKB'));
const RiwayatImunisasi = lazy(
  () => import('./components/contents/Riwayat/RiwayatImunisasi'),
);
const RiwayatNifas = lazy(
  () => import('./components/contents/Riwayat/RiwayatNifas'),
);
const RiwayatKehamilan = lazy(
  () => import('./components/contents/Riwayat/RiwayatKehamilan'),
);
const RiwayatPersalinan = lazy(
  () => import('./components/contents/Riwayat/RiwayatPersalinan'),
);
const DataPasien = lazy(() => import('./components/contents/DataPasien'));
const UpdatePasien = lazy(() => import('./components/contents/UpdatePasien'));
const DetailPasien = lazy(() => import('./components/contents/DetailPasien'));
const DetailPersalinan = lazy(
  () => import('./components/contents/DetailPersalinan'),
);
const Master = lazy(() => import('./components/contents/Master/Master'));

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey={`${APP.NAME}-theme`}>
        <BrowserRouter>
          <div className="absolute p-2">
            <ModeToggle />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="*" element={<Login background={APP.BG} />} />
              <Route path="/activate/" element={<Activate />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey={`${APP.NAME}-theme`}>
      <BrowserRouter>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <SideNav />
          <div className="flex flex-col">
            <TopBar />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/kehamilan/*" element={<Kehamilan />} />
                  <Route path="/persalinan/*" element={<Persalinan />} />
                  <Route path="/nifas/*" element={<Nifas />} />
                  <Route path="/kb/*" element={<KB />} />
                  <Route path="/imunisasi/*" element={<Imunisasi />} />
                  <Route
                    path="/riwayat-kehamilan"
                    element={<RiwayatKehamilan />}
                  />
                  <Route
                    path="/riwayat-persalinan/*"
                    element={<RiwayatPersalinan />}
                  />
                  <Route
                    path="/riwayat-persalinan/:patientId"
                    element={<DetailPersalinan />}
                  />
                  <Route path="/riwayat-nifas" element={<RiwayatNifas />} />
                  <Route path="/riwayat-kb" element={<RiwayatKB />} />
                  <Route
                    path="/riwayat-imunisasi"
                    element={<RiwayatImunisasi />}
                  />
                  <Route path="/reminder" element={<Pengingat />} />
                  <Route path="/data-pasien/*" element={<DataPasien />} />
                  <Route
                    path="/data-pasien/:patientId"
                    element={<DetailPasien />}
                  />
                  <Route
                    path="/data-pasien/:patientId/edit/"
                    element={<UpdatePasien />}
                  />
                  <Route path="/master-data/*" element={<Master />} />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
