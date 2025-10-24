import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  DollarSign, 
  Search, 
  Star,
  CheckCircle2,
  Info
} from 'lucide-react';
import { cn } from './ui/utils';

// Mock data for parking spaces
const parkingSpaces = [
  {
    id: 1,
    name: 'Parqueadero Centro Comercial Jardin Plaza',
    address: 'Av. Principal 123, Centro',
    distance: '0.5 km',
    availableSpots: 12,
    totalSpots: 50,
    pricePerHour: 2.50,
    rating: 4.5,
    features: ['Cubierto', 'Seguridad 24/7', 'Acceso fácil'],
    type: 'private'
  },
  {
    id: 2,
    name: 'Parqueadero Torre Empresarial',
    address: 'Zona Financiera, Edificio 5',
    distance: '2.1 km',
    availableSpots: 5,
    totalSpots: 30,
    pricePerHour: 3.00,
    rating: 4.8,
    features: ['Cubierto', 'Vigilancia', 'Lavado de autos'],
    type: 'private'
  },
  {
    id: 3,
    name: 'Parqueadero Unicentro',
    address: 'Junto a la universidad del valle',
    distance: '0.8 km',
    availableSpots: 180,
    totalSpots: 80,
    pricePerHour: 2.00,
    rating: 4.3,
    features: ['Cubierto', 'Seguridad'],
    type: 'private'
  }
];

export function SearchParking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('2');
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null);

  const filteredSpaces = parkingSpaces.filter(space => 
    space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReserve = (spaceId: number) => {
    setSelectedSpace(spaceId);
    // Here you would handle the reservation logic
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Search Panel */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Buscar Estacionamiento</CardTitle>
            <CardDescription>Encuentra el espacio perfecto cerca de ti</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="location"
                  placeholder="Ingresa dirección o lugar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duración estimada</Label>
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger id="duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hora</SelectItem>
                  <SelectItem value="2">2 horas</SelectItem>
                  <SelectItem value="3">3 horas</SelectItem>
                  <SelectItem value="4">4 horas</SelectItem>
                  <SelectItem value="day">Todo el día</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" size="lg">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>

            <Button variant="outline" className="w-full">
              <Navigation className="w-4 h-4 mr-2" />
              Usar mi ubicación actual
            </Button>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <div className="flex gap-2">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  Los espacios se actualizan en tiempo real con sensores IoT
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2">
        <div className="mb-4">
          <h2 className="text-slate-900 mb-1">
            Espacios Disponibles
          </h2>
          <p className="text-sm text-slate-600">
            {filteredSpaces.length} resultados encontrados
          </p>
        </div>

        <div className="space-y-4">
          {filteredSpaces.map((space) => {
            const occupancyRate = ((space.totalSpots - space.availableSpots) / space.totalSpots) * 100;
            const isLowAvailability = space.availableSpots <= 5;

            return (
              <Card 
                key={space.id}
                className={cn(
                  "transition-all hover:shadow-lg",
                  selectedSpace === space.id && "ring-2 ring-green-600"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-slate-900 mb-1">
                            {space.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-slate-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            {space.address}
                          </div>
                        </div>
                        <Badge variant={space.type === 'private' ? 'default' : 'secondary'}>
                          {space.type === 'private' ? 'Privado' : 'Público'}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {space.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Navigation className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{space.distance}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-slate-600">{space.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">${space.pricePerHour}/h</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className={cn(
                            "w-4 h-4",
                            isLowAvailability ? "text-orange-500" : "text-green-500"
                          )} />
                          <span className={cn(
                            isLowAvailability ? "text-orange-600" : "text-green-600"
                          )}>
                            {space.availableSpots} libres
                          </span>
                        </div>
                      </div>

                      {/* Occupancy Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                          <span>Ocupación</span>
                          <span>{Math.round(occupancyRate)}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all",
                              occupancyRate > 80 ? "bg-red-500" : 
                              occupancyRate > 60 ? "bg-orange-500" : "bg-green-500"
                            )}
                            style={{ width: `${occupancyRate}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                        <DollarSign className="w-5 h-5 text-slate-600" />
                        <div>
                          <div className="text-sm text-slate-900">
                            Costo estimado: ${(space.pricePerHour * parseFloat(selectedDuration === 'day' ? '8' : selectedDuration)).toFixed(2)}
                          </div>
                          <div className="text-xs text-slate-600">
                            Para {selectedDuration === 'day' ? 'todo el día' : `${selectedDuration} horas`}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2">
                      <Button 
                        onClick={() => handleReserve(space.id)}
                        className="flex-1 sm:flex-none"
                        disabled={space.availableSpots === 0}
                      >
                        {selectedSpace === space.id ? 'Seleccionado' : 'Reservar'}
                      </Button>
                      <Button variant="outline" className="flex-1 sm:flex-none">
                        Ver mapa
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
