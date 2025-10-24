import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import {
  Navigation,
  Camera,
  MapPin,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Locate,
  CheckCircle2,
  AlertCircle,
  Zap,
  Smartphone,
  ScanLine,
  Target,
  TrendingUp,
  Eye
} from 'lucide-react';
import { cn } from './ui/utils';

// Mock AR navigation data
const navigationSteps = [
  {
    id: 1,
    instruction: 'Ingresa por la entrada principal',
    direction: 'forward',
    distance: 45,
    floor: 'Planta Baja'
  },
  {
    id: 2,
    instruction: 'Gira a la derecha en el pasillo A',
    direction: 'right',
    distance: 23,
    floor: 'Planta Baja'
  },
  {
    id: 3,
    instruction: 'Continúa recto por 15 metros',
    direction: 'forward',
    distance: 15,
    floor: 'Planta Baja'
  },
  {
    id: 4,
    instruction: 'Tu espacio está a la izquierda',
    direction: 'left',
    distance: 5,
    floor: 'Planta Baja'
  }
];

const reservationData = {
  parkingName: 'Parqueadero Centro Comercial Jardin Plaza',
  spot: 'A-24',
  floor: 'Planta Baja',
  section: 'Zona A',
  type: 'Regular',
  timeRemaining: '1h 45min'
};

export function ARNavigation() {
  const [isARActive, setIsARActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [distanceToSpot, setDistanceToSpot] = useState(88);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [foundSpot, setFoundSpot] = useState(false);

  useEffect(() => {
    if (isARActive && !foundSpot) {
      const interval = setInterval(() => {
        setDistanceToSpot(prev => {
          const newDistance = Math.max(0, prev - 2);
          if (newDistance === 0) {
            setFoundSpot(true);
            clearInterval(interval);
          }
          if (newDistance <= 45 && currentStep === 0) setCurrentStep(1);
          if (newDistance <= 23 && currentStep === 1) setCurrentStep(2);
          if (newDistance <= 15 && currentStep === 2) setCurrentStep(3);
          if (newDistance <= 5 && currentStep === 3) setCurrentStep(4);
          return newDistance;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isARActive, currentStep, foundSpot]);

  const handleStartAR = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      setIsARActive(true);
    }, 2000);
  };

  const handleStopAR = () => {
    setIsARActive(false);
    setCurrentStep(0);
    setDistanceToSpot(88);
    setFoundSpot(false);
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'forward':
        return <ArrowUp className="w-8 h-8" />;
      case 'right':
        return <ArrowRight className="w-8 h-8" />;
      case 'left':
        return <ArrowLeft className="w-8 h-8" />;
      case 'backward':
        return <ArrowDown className="w-8 h-8" />;
      default:
        return <Navigation className="w-8 h-8" />;
    }
  };

  const progressPercentage = ((88 - distanceToSpot) / 88) * 100;

  if (!isARActive && !isCalibrating) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-slate-900 mb-2">
                Navegación con Realidad Aumentada
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Encuentra tu espacio de estacionamiento fácilmente con nuestra tecnología de realidad aumentada. 
                Guía visual paso a paso en tiempo real.
              </p>
            </div>

            {/* Reservation Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-slate-900 mb-1">
                    Tu Reserva Activa
                  </h3>
                  <p className="text-sm text-slate-600">{reservationData.parkingName}</p>
                </div>
                <Badge className="bg-blue-600">
                  {reservationData.timeRemaining}
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-slate-600 mb-1">Espacio</div>
                  <div className="text-slate-900">{reservationData.spot}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">Piso</div>
                  <div className="text-slate-900">{reservationData.floor}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">Sección</div>
                  <div className="text-slate-900">{reservationData.section}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">Tipo</div>
                  <div className="text-slate-900">{reservationData.type}</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="text-slate-900">Precisión GPS</h4>
                </div>
                <p className="text-sm text-slate-600">
                  Localización exacta con tecnología de posicionamiento interno
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ScanLine className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="text-slate-900">Detección AR</h4>
                </div>
                <p className="text-sm text-slate-600">
                  Indicadores visuales superpuestos en tiempo real
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="text-slate-900">Guía Inteligente</h4>
                </div>
                <p className="text-sm text-slate-600">
                  Instrucciones adaptativas según tu ubicación
                </p>
              </div>
            </div>

            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <Smartphone className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900">
                Asegúrate de permitir el acceso a la cámara y los sensores de tu dispositivo para una experiencia óptima.
              </AlertDescription>
            </Alert>

            <Button 
              onClick={handleStartAR} 
              size="lg" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Camera className="w-5 h-5 mr-2" />
              Activar Navegación AR
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCalibrating) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-blue-500">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4 animate-pulse">
                <Locate className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-slate-900 mb-2">Calibrando sensores...</h3>
              <p className="text-slate-600 mb-6">
                Por favor mantén tu dispositivo estable mientras detectamos tu ubicación
              </p>
              <Progress value={66} className="mb-4" />
              <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                GPS Activado
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Cámara Activada
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Sensores Activados
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (foundSpot) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-green-500">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-slate-900 mb-2">
                ¡Has llegado a tu espacio!
              </h2>
              <p className="text-slate-600 mb-6">
                Espacio {reservationData.spot} identificado correctamente
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-green-700 mb-1">Espacio</div>
                    <div className="text-green-900 text-xl">{reservationData.spot}</div>
                  </div>
                  <div>
                    <div className="text-xs text-green-700 mb-1">Tiempo restante</div>
                    <div className="text-green-900 text-xl">{reservationData.timeRemaining}</div>
                  </div>
                </div>
                <Alert className="border-green-300 bg-green-100">
                  <AlertCircle className="h-4 w-4 text-green-700" />
                  <AlertDescription className="text-green-900">
                    Recuerda validar tu entrada con el código QR antes de estacionar
                  </AlertDescription>
                </Alert>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleStopAR} variant="outline" className="flex-1">
                  Finalizar navegación
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <ScanLine className="w-4 h-4 mr-2" />
                  Mostrar código QR
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* AR View Simulator */}
      <Card className="border-blue-500 overflow-hidden">
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 aspect-video">
          {/* Simulated Camera View */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-purple-500/10">
            {/* AR Grid Overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full">
                {[...Array(48)].map((_, i) => (
                  <div key={i} className="border border-blue-400/30"></div>
                ))}
              </div>
            </div>

            {/* AR Direction Indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Pulsing Circle */}
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-6 shadow-2xl shadow-blue-500/50">
                  {currentStep < navigationSteps.length && getDirectionIcon(navigationSteps[currentStep].direction)}
                </div>
              </div>
            </div>

            {/* Distance Indicator */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
              <div className="bg-black/80 backdrop-blur-sm border-2 border-blue-500 rounded-full px-6 py-3 shadow-lg">
                <div className="text-center">
                  <div className="text-blue-400 text-xs mb-1">Distancia al espacio</div>
                  <div className="text-white text-2xl">{distanceToSpot}m</div>
                </div>
              </div>
            </div>

            {/* Spot Indicator */}
            <div className="absolute top-8 right-8">
              <div className="bg-black/80 backdrop-blur-sm border-2 border-purple-500 rounded-lg px-4 py-2">
                <div className="text-purple-400 text-xs">Destino</div>
                <div className="text-white">{reservationData.spot}</div>
              </div>
            </div>

            {/* Floor Indicator */}
            <div className="absolute top-24 right-8">
              <div className="bg-black/80 backdrop-blur-sm border border-slate-600 rounded-lg px-4 py-2">
                <div className="text-slate-400 text-xs">Piso</div>
                <div className="text-white text-sm">{reservationData.floor}</div>
              </div>
            </div>

            {/* AR Markers */}
            <div className="absolute bottom-1/4 left-1/4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
            </div>
            <div className="absolute bottom-1/3 right-1/3">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
            </div>

            {/* Scan Lines Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 animate-scan"></div>
            </div>
          </div>

          {/* Corner Brackets */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-blue-500"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-blue-500"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-blue-500"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-blue-500"></div>
        </div>
      </Card>

      {/* Navigation Instructions */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-900">Navegación Activa</h3>
              <Badge variant="outline" className="border-blue-500 text-blue-600">
                Paso {currentStep + 1} de {navigationSteps.length}
              </Badge>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <div className="text-xs text-slate-600">
              {Math.round(progressPercentage)}% del recorrido completado
            </div>
          </div>

          {currentStep < navigationSteps.length && (
            <Alert className="border-blue-200 bg-blue-50 mb-4">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-1">{navigationSteps[currentStep].instruction}</div>
                    <div className="text-xs text-blue-700">
                      {navigationSteps[currentStep].distance} metros • {navigationSteps[currentStep].floor}
                    </div>
                  </div>
                  <div className="text-blue-600 ml-4">
                    {getDirectionIcon(navigationSteps[currentStep].direction)}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* All Steps */}
          <div className="space-y-2">
            {navigationSteps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-all",
                  index < currentStep && "bg-green-50 border-green-200 opacity-60",
                  index === currentStep && "bg-blue-50 border-blue-300 shadow-sm",
                  index > currentStep && "bg-slate-50 border-slate-200 opacity-40"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0",
                  index < currentStep && "bg-green-500 text-white",
                  index === currentStep && "bg-blue-500 text-white animate-pulse",
                  index > currentStep && "bg-slate-300 text-slate-600"
                )}>
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className={cn(
                    "text-sm",
                    index === currentStep ? "text-slate-900" : "text-slate-600"
                  )}>
                    {step.instruction}
                  </div>
                  <div className="text-xs text-slate-500">
                    {step.distance}m • {step.floor}
                  </div>
                </div>
                <div className="text-slate-400">
                  {getDirectionIcon(step.direction)}
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleStopAR} 
            variant="outline" 
            className="w-full mt-4"
          >
            Detener navegación
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
