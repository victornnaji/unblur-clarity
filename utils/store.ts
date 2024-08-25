import { createStore } from "zustand/vanilla";
import { DEFAULT_UNBLUR_OPTION, DEFAULT_UPSCALING_STYLE } from "@/config";
import { PhotoType, UnblurModel, UpscalingStyle } from "@/types";

type PayloadStore = {
  prompt: string;
  upscaleStyle: UpscalingStyle;
};

export type AppStoreState = {
  model: UnblurModel;
  photo: PhotoType;
  payload: PayloadStore;
};

export type AppStoreActions = {
  setModel: (model: UnblurModel) => void;
  setPhoto: (photo: PhotoType) => void;
  setPayload: (payload: PayloadStore) => void;
  reset: () => void;
};

export type AppStore = AppStoreState & AppStoreActions;

export const defaultState: AppStoreState = {
  model: DEFAULT_UNBLUR_OPTION.value,
  photo: {
    name: "",
    originalImage: "",
    restoredImage: "",
  },
  payload: {
    prompt: "",
    upscaleStyle: DEFAULT_UPSCALING_STYLE.value,
  },
};

export const createAppStore = (initState: AppStoreState = defaultState) => {
  return createStore<AppStore>((set) => ({
    ...initState,
    setModel: (model: UnblurModel) => set((state) => ({ ...state, model })),
    setPhoto: (photo: PhotoType) => set((state) => ({ ...state, photo })),
    reset: () => set(() => ({ ...defaultState })),
    setPayload: (payload: PayloadStore) =>
      set((state) => ({ ...state, payload })),
  }));
};
