import { ThemeProvider } from '@/components/theme-provider';
import { TimeProvider } from '@/contexts/time-context';
import TradeLayout from '@/components/trade-layout';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <TimeProvider>
        <main className="flex items-center justify-center min-h-screen bg-zinc-900 p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-7xl h-auto lg:h-[85vh] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-2 border-2 border-gray-700/50">
            <div className="w-full h-full bg-gray-800/50 rounded-lg p-2 border-t-2 border-white/5">
              <div className="relative w-full h-full bg-zinc-900 rounded-md overflow-hidden border-2 border-black/50 bg-noise">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/30 via-transparent to-transparent -z-10" />
                <div className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto no-scrollbar">
                  <TradeLayout />
                  <Toaster />
                </div>
              </div>
            </div>
          </div>
        </main>
      </TimeProvider>
    </ThemeProvider>
  );
}

export default App;
