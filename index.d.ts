import { ComponentType, ReactNode, CSSProperties, Context, RefObject } from 'react';

// =======================
// Core Types
// =======================

export type Coordinates = [number, number];

export type GeographyFeature = {
  type: 'Feature';
  geometry: any;
  properties: any;
  svgPath?: string;
  rsmKey?: string;
  id?: string | number;
};

export type Geography = GeographyFeature[] | any;

export type ProjectionFunction = (coordinates: Coordinates) => Coordinates | null;

export interface ProjectionConfig {
  center?: Coordinates;
  rotate?: [number, number, number];
  scale?: number;
  parallels?: [number, number];
}

export interface StyleState {
  default?: CSSProperties;
  hover?: CSSProperties;
  pressed?: CSSProperties;
}

// =======================
// Component Props
// =======================

export interface ComposableMapProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  projection?: string | ProjectionFunction;
  projectionConfig?: ProjectionConfig;
  className?: string;
  children?: ReactNode;
}

export interface MapProviderProps {
  width?: number;
  height?: number;
  projection?: string | ProjectionFunction;
  projectionConfig?: ProjectionConfig;
  children?: ReactNode;
}

export interface GeographiesProps {
  geography?: string | Geography;
  children?: (data: {
    geographies: GeographyFeature[];
    outline: any;
    borders: any;
    path: any;
    projection: ProjectionFunction;
  }) => ReactNode;
  parseGeographies?: (geographies: any) => GeographyFeature[];
  className?: string;
}

export interface GeographyProps extends Omit<React.SVGProps<SVGPathElement>, 'style'> {
  geography?: GeographyFeature;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  style?: StyleState;
  className?: string;
}

export interface MarkerProps {
  coordinates: Coordinates;
  children?: ReactNode;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  style?: StyleState;
  className?: string;
}

export interface AnnotationProps {
  subject: Coordinates;
  children?: ReactNode;
  connectorProps?: any;
  dx?: number;
  dy?: number;
  curve?: number;
  className?: string;
}

export interface ZoomableGroupProps {
  center?: Coordinates;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  translateExtent?: [Coordinates, Coordinates];
  filterZoomEvent?: (event: any) => boolean;
  onMoveStart?: (position: { coordinates: Coordinates; zoom: number }, event: any) => void;
  onMove?: (position: { x: number; y: number; zoom: number; dragging: any }, event: any) => void;
  onMoveEnd?: (position: { coordinates: Coordinates; zoom: number }, event: any) => void;
  className?: string;
  children?: ReactNode;
}

export interface SphereProps {
  id?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

export interface GraticuleProps {
  fill?: string;
  stroke?: string;
  step?: [number, number];
  className?: string;
}

export interface LineProps {
  from?: Coordinates;
  to?: Coordinates;
  coordinates?: Coordinates[];
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  className?: string;
}

export interface ZoomPanProviderProps {
  value?: {
    x?: number;
    y?: number;
    k?: number;
    transformString?: string;
  };
  children?: ReactNode;
}

// =======================
// Hook Types
// =======================

export interface UseGeographiesParams {
  geography?: string | Geography;
  parseGeographies?: (geographies: any) => GeographyFeature[];
}

export interface UseGeographiesReturn {
  geographies: GeographyFeature[];
  outline: any;
  borders: any;
}

export interface UseZoomPanParams {
  center: Coordinates;
  filterZoomEvent?: (event: any) => boolean;
  onMoveStart?: (position: { coordinates: Coordinates; zoom: number }, event: any) => void;
  onMoveEnd?: (position: { coordinates: Coordinates; zoom: number }, event: any) => void;
  onMove?: (position: { x: number; y: number; zoom: number; dragging: any }, event: any) => void;
  translateExtent?: [Coordinates, Coordinates];
  scaleExtent?: [number, number];
  zoom?: number;
}

export interface UseZoomPanReturn {
  mapRef: RefObject<SVGGElement>;
  position: { x: number; y: number; k: number; dragging?: any };
  transformString: string;
}

export interface MapContextValue {
  width: number;
  height: number;
  projection: ProjectionFunction;
  path: any;
}

export interface ZoomPanContextValue {
  x: number;
  y: number;
  k: number;
  transformString: string;
}

// =======================
// Component Exports
// =======================

export const ComposableMap: ComponentType<ComposableMapProps>;
export const Geographies: ComponentType<GeographiesProps>;
export const Geography: ComponentType<GeographyProps>;
export const Marker: ComponentType<MarkerProps>;
export const Annotation: ComponentType<AnnotationProps>;
export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
export const Sphere: ComponentType<SphereProps>;
export const Graticule: ComponentType<GraticuleProps>;
export const Line: ComponentType<LineProps>;

export const MapProvider: ComponentType<MapProviderProps>;
export const ZoomPanProvider: ComponentType<ZoomPanProviderProps>;

// =======================
// Context Exports
// =======================

export const MapContext: Context<MapContextValue>;
export const ZoomPanContext: Context<ZoomPanContextValue>;

// =======================
// Hook Exports
// =======================

export function useGeographies(params: UseGeographiesParams): UseGeographiesReturn;
export function useZoomPan(params: UseZoomPanParams): UseZoomPanReturn;
export function useMapContext(): MapContextValue;
export function useZoomPanContext(): ZoomPanContextValue; 