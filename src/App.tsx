import Login from './pages/Login';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { SideNav } from '@/components/SideNav';
import { TopBar } from '@/components/TopBar';
import { app } from './data/app';
import { Dashboard } from '@/components/contents/Dashboard';
import { Admin } from './pages/Admin';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  if (!isLogin) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey={`${app.name}-theme`}>
        <div className="absolute">
          <ModeToggle />
        </div>
        <Login
          handleLogin={setIsLogin}
          background={app.backgroundImage}
          setAdmin={setIsAdmin}
        />
      </ThemeProvider>
    );
  }
  if (isLogin && isAdmin) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey={`${app.name}-theme`}>
        <div className="absolute">
          <ModeToggle />
        </div>
        <Admin />
      </ThemeProvider>
    );
  }

  

  return (
    <ThemeProvider defaultTheme="dark" storageKey={`${app.name}-theme`}>
      <BrowserRouter>
        {/* Layout */}
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <SideNav />
          <div className="flex flex-col">
            <TopBar handleLogout={setIsLogin}/>

            {/* Main Content */}

            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/orders" element={<Orders />} /> */}
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
