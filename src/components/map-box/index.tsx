import { ILocation } from '@/src/lib/types';
import { isEmpty } from 'lodash';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

const MapContainer = ({ locations }: { locations: ILocation[] }) => {
    mapboxgl.accessToken =
        'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getMap = async () => {
            if (mapContainer.current) {
                const map = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/jonasschmedtmann/cjvi9q8jd04mi1cpgmg7ev3dy',
                    // scrollZoom: false,
                });
                const bounds = new mapboxgl.LngLatBounds();

                !isEmpty(locations && map) &&
                    locations.forEach((loc) => {
                        if (loc.coordinates.length == 2) {
                            // Create marker
                            const el = document.createElement('div');
                            el.className = 'marker';
                            el.onclick = () => {
                                map.flyTo({ center: loc.coordinates, zoom: map.getZoom() + 1, essential: true });
                            };

                            const Popup = new mapboxgl.Popup({
                                offset: 30,
                            })
                                .setLngLat(loc.coordinates)
                                .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
                                .addTo(map);
                            // Add marker
                            new mapboxgl.Marker({
                                element: el,
                                anchor: 'bottom',
                            })
                                .setLngLat(loc.coordinates)
                                .addTo(map)
                                .setPopup(Popup);

                            // Add popup

                            // Extend map bounds to include current location
                            bounds.extend(loc.coordinates);
                        }
                    });
                if (map && bounds) {
                    const validBounds = await (bounds.getSouthWest() && bounds.getNorthEast());

                    if (validBounds) {
                        map.fitBounds(bounds, {
                            padding: {
                                top: 200,
                                bottom: 150,
                                left: 100,
                                right: 100,
                            },
                        });
                    }
                }
            }
        };
        getMap();
    }, [mapContainer]);

    return (
        <>
            <div>
                <div ref={mapContainer} id='map' />
            </div>
        </>
    );
};

export default MapContainer;
