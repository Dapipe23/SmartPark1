import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import {
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  DollarSign,
  Navigation,
  QrCode,
  AlertCircle,
  CheckCircle2,
  XCircle,
  User,
  Settings,
  CreditCard
} from 'lucide-react';
import { cn } from './ui/utils';

// Mock data for user reservations
const activeReservations = [
  {
    id: 1,
    parkingName: 'Parqueadero Centro Comercial Jardin Plaza',
    address: 'Av. Principal 123, Centro',
    spot: 'A-24',
    startTime: '14:00',
    endTime: '16:00',
    date: '2025-10-17',
    price: 5.00,
    status: 'active',
    timeRemaining: '45 min',
    progress: 60
  }
];

const upcomingReservations = [
  {
    id: 2,
    parkingName: 'Parqueadero Unicentro',
    address: 'Junto a la universidad del valle',
    spot: 'B-12',
    startTime: '09:00',
    endTime: '17:00',
    date: '2025-10-18',
    price: 16.00,
    status: 'upcoming'
  },
  {
    id: 3,
    parkingName: 'Parqueadero Torre Empresarial',
    address: 'Zona Financiera, Edificio 5',
    spot: 'C-08',
    startTime: '08:30',
    endTime: '18:30',
    date: '2025-10-19',
    price: 30.00,
    status: 'upcoming'
  }
];

const pastReservations = [
  {
    id: 4,
    parkingName: 'Parqueadero Centro Comercial Jardin Plaza',
    address: 'Av. Principal 123, Centro',
    spot: 'A-18',
    startTime: '15:00',
    endTime: '18:00',
    date: '2025-10-12',
    price: 7.50,
    status: 'completed'
  },
  {
    id: 5,
    parkingName: 'Parqueadero Unicentro',
    address: 'Junto a la universidad del valle',
    spot: 'B-05',
    startTime: '11:00',
    endTime: '14:00',
    date: '2025-10-10',
    price: 6.00,
    status: 'cancelled'
  }
];

// Mock user data
const userData = {
  name: 'Juan Pérez',
  email: 'juan.perez@email.com',
  phone: '+1 234 567 8900',
  memberSince: 'Enero 2024',
  totalReservations: 24,
  totalSpent: 186.50
};

export function UserReservations() {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* User Profile Panel */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Mi Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-3">
                <AvatarFallback className="text-xl bg-green-600 text-white">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-slate-900 mb-1">{userData.name}</h3>
              <p className="text-sm text-slate-600 mb-1">{userData.email}</p>
              <p className="text-sm text-slate-600">{userData.phone}</p>
              <Badge variant="secondary" className="mt-2">
                Miembro desde {userData.memberSince}
              </Badge>
            </div>

            <div className="space-y-3 pt-3 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total reservas</span>
                <span className="text-slate-900">{userData.totalReservations}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total gastado</span>
                <span className="text-slate-900">${userData.totalSpent.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t">
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Editar perfil
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="w-4 h-4 mr-2" />
                Métodos de pago
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reservations Panel */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Mis Reservas</CardTitle>
            <CardDescription>Gestiona tus espacios de estacionamiento</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="active">
                  Activas ({activeReservations.length})
                </TabsTrigger>
                <TabsTrigger value="upcoming">
                  Próximas ({upcomingReservations.length})
                </TabsTrigger>
                <TabsTrigger value="past">
                  Historial ({pastReservations.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {activeReservations.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No tienes reservas activas</p>
                  </div>
                ) : (
                  activeReservations.map((reservation) => (
                    <Card key={reservation.id} className="border-green-200 bg-green-50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-600">Activa</Badge>
                              <Badge variant="outline">Espacio: {reservation.spot}</Badge>
                            </div>
                            <h3 className="text-slate-900 mb-1">
                              {reservation.parkingName}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <MapPin className="w-4 h-4" />
                              {reservation.address}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarIcon className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">{reservation.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">{reservation.startTime} - {reservation.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">${reservation.price.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-600">{reservation.timeRemaining} restante</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                            <span>Tiempo transcurrido</span>
                            <span>{reservation.progress}%</span>
                          </div>
                          <Progress value={reservation.progress} className="h-2" />
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1">
                            <QrCode className="w-4 h-4 mr-2" />
                            Código QR
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Navigation className="w-4 h-4 mr-2" />
                            Navegar
                          </Button>
                          <Button variant="destructive" size="icon">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingReservations.map((reservation) => (
                  <Card key={reservation.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Próxima</Badge>
                            <Badge variant="outline">Espacio: {reservation.spot}</Badge>
                          </div>
                          <h3 className="text-slate-900 mb-1">
                            {reservation.parkingName}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <MapPin className="w-4 h-4" />
                            {reservation.address}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{reservation.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{reservation.startTime} - {reservation.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">${reservation.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Ver detalles
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Modificar
                        </Button>
                        <Button variant="destructive" className="flex-1">
                          Cancelar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {pastReservations.map((reservation) => (
                  <Card key={reservation.id} className="opacity-75">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant={reservation.status === 'completed' ? 'default' : 'destructive'}
                              className={cn(
                                reservation.status === 'completed' && 'bg-slate-600'
                              )}
                            >
                              {reservation.status === 'completed' ? (
                                <><CheckCircle2 className="w-3 h-3 mr-1" /> Completada</>
                              ) : (
                                <><XCircle className="w-3 h-3 mr-1" /> Cancelada</>
                              )}
                            </Badge>
                            <Badge variant="outline">Espacio: {reservation.spot}</Badge>
                          </div>
                          <h3 className="text-slate-900 mb-1">
                            {reservation.parkingName}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <MapPin className="w-4 h-4" />
                            {reservation.address}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{reservation.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{reservation.startTime} - {reservation.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">${reservation.price.toFixed(2)}</span>
                        </div>
                      </div>

                      {reservation.status === 'completed' && (
                        <Button variant="outline" className="w-full">
                          Volver a reservar
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
