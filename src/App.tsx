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
import { Riwayat } from './components/contents/Riwayat';
import { Persalinan } from './components/contents/Persalinan';
import { ReminderKB } from './components/contents/ReminderKB';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey={`${APP.NAME}-theme`}>
        <div className="absolute">
          <ModeToggle />
        </div>
        <Login background={APP.BG} />
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
                <Route path="/persalinan" element={<Persalinan />} />
                <Route path="/nifas" element={<Nifas />} />
                <Route path="/kb" element={<KB />} />
                <Route path="/imunisasi" element={<Imunisasi />} />
                <Route path="/riwayat" element={<Riwayat />} />
                <Route path="/reminder-kb" element={<ReminderKB />} />
                <Route path="/master-data/*" element={<Master />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
