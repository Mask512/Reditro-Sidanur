import Login from './pages/Login';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { SideNav } from '@/components/SideNav';
import { TopBar } from '@/components/TopBar';
import { APP } from './data/app';
import { Dashboard } from '@/components/contents/Dashboard';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';
import { Master } from './components/contents/Master/Master';
import { Register } from './components/contents/Register';
import { Appointment } from './components/contents/Appointment';
import { Anamnesis } from './components/contents/Anamnesis';
import { Kehamilan } from './components/contents/Kehamilan';
import { Nifas } from './components/contents/Nifas';
import { KB } from './components/contents/KB';
import { Imunisasi } from './components/contents/Imunisasi';
import { Persalinan } from './components/contents/Persalinan';
import { Pengingat } from './components/contents/Pengingat';
import { RiwayatKB } from './components/contents/Riwayat/RiwayatKB';
import { RiwayatImunisasi } from './components/contents/Riwayat/RiwayatImunisasi';
import { RiwayatNifas } from './components/contents/Riwayat/RiwayatNifas';
import { RiwayatKehamilan } from './components/contents/Riwayat/RiwayatKehamilan';
import { RiwayatPersalinan } from './components/contents/Riwayat/RiwayatPersalinan';
import { Activate } from './pages/Activate';
import { DataPasien } from './components/contents/DataPasien';
import { UpdatePasien } from './components/contents/UpdatePasien';
import { DetailPasien } from './components/contents/DetailPasien';
import { DetailPersalinan } from './components/contents/DetailPersalinan';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey={`${APP.NAME}-theme`}>
        <BrowserRouter>
          <div className="absolute p-2">
            <ModeToggle />
          </div>
          <Routes>
            <Route path="*" element={<Login background={APP.BG} />} />
            <Route path="/activate/" element={<Activate />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey={`${APP.NAME}-theme`}>
      <BrowserRouter>
        {/* Layout */}
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <SideNav />
          <div className="flex flex-col">
            <TopBar />

            {/* Main Content */}

            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/anamnesis" element={<Anamnesis />} />
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
                <Route path="/data-pasien/:patientId" element={<DetailPasien />} />
                <Route path="/data-pasien/:patientId/edit/" element={<UpdatePasien />} />
                <Route path="/master-data/*" element={<Master />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
