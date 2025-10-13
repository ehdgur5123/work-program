import { create } from "zustand";

type State = {
  initialCoordinate: { lat: number; lng: number };
  coordinate: { lat: number; lng: number };
  setCoordinate: (data: { lat: number; lng: number }) => void;
};

const initialCoordinate = { lat: 37.5665, lng: 126.978 };

export const useKakaoMapStore = create<State>((set) => ({
  initialCoordinate: initialCoordinate,
  coordinate: initialCoordinate,
  setCoordinate: (data) =>
    set(() => ({ coordinate: { lat: data.lat, lng: data.lng } })),
}));
