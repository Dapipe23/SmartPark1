import { useState } from "react";
import { SearchParking } from "./components/SearchParking";
import { UserReservations } from "./components/UserReservations";
import { ARNavigation } from "./components/ARNavigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { ParkingSquare, Calendar, Eye } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <ParkingSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-slate-900">SMARTPARK</h1>
              <p className="text-slate-600 text-sm">
                Encuentra, Llega y Estaciona
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger
              value="search"
              className="flex items-center gap-2"
            >
              <ParkingSquare className="w-4 h-4" />
              Buscar
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Navegación AR
            </TabsTrigger>
            <TabsTrigger
              value="reservations"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Mis Reservas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <SearchParking />
          </TabsContent>

          <TabsContent value="ar">
            <ARNavigation />
          </TabsContent>

          <TabsContent value="reservations">
            <UserReservations />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}