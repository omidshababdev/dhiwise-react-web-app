import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

type GoogleMapProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    showMarker: boolean;
  }>;
type MapProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    center: google.maps.LatLngLiteral;
    zoom: number;
    markers: google.maps.LatLngLiteral[];
  }>;

const Map = ({ center, zoom, markers, ...props }: MapProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map, center, zoom]);

  React.useEffect(() => {
    markers.forEach((markerData) => {
      const newMarker = new window.google.maps.Marker();
      newMarker.setOptions({
        position: markerData,
        map: map,
        title: "Hello World!",
      });
    });
  }, [map, markers]);

  return <div ref={ref} id="map" {...props} />;
};

const GoogleMap = ({
  children,
  showMarker = false,
  className,
  ...restProps
}: GoogleMapProps) => {
  const [currentLocation, setLocation] = React.useState({ lat: 0, lng: 0 });

  React.useEffect(() => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setLocation(pos);
      },
    );
  }, []);

  return (
    <Wrapper apiKey={import.meta.env?.VITE_GOOGLE_MAP_ID}>
      <Map
        center={currentLocation}
        zoom={3}
        className={className}
        markers={showMarker ? [currentLocation] : []}
        {...restProps}
      />
    </Wrapper>
  );
};

export { GoogleMap };
