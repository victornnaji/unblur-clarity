import { createStore } from "zustand/vanilla";
import { DEFAULT_UNBLUR_OPTION, DEFAULT_UPSCALING_STYLE } from "@/config";
import { PhotoType, UnblurModel, UpscalingStyle } from "@/types";

type PayloadStore = {
  prompt: string;
  upscaleStyle: UpscalingStyle;
};

type AppStatusStore = {
  status: "idle" | "reset" | "processing" | "canceled" | "success" | "error";
  message: string;
};

export type AppStoreState = {
  model: UnblurModel;
  photo: PhotoType;
  payload: PayloadStore;
  appStatus: AppStatusStore;
};

export type AppStoreActions = {
  setModel: (model: UnblurModel) => void;
  setPhoto: (photo: PhotoType) => void;
  setPayload: (payload: PayloadStore) => void;
  setAppStatus: (status: AppStatusStore) => void;
  reset: () => void;
};

export type AppStore = AppStoreState & AppStoreActions;

export const defaultState: AppStoreState = {
  appStatus: {
    status: "idle",
    message: ""
  },
  model: DEFAULT_UNBLUR_OPTION.value,
  photo: {
    name: "",
    originalImage: "",
    restoredImage: ""
  },
  payload: {
    prompt: "",
    upscaleStyle: DEFAULT_UPSCALING_STYLE.value
  }
};

export const createAppStore = (initState: AppStoreState = defaultState) => {
  return createStore<AppStore>((set) => ({
    ...initState,
    setModel: (model: UnblurModel) => set((state) => ({ ...state, model })),
    setPhoto: (photo: PhotoType) => set((state) => ({ ...state, photo })),
    setAppStatus: (appStatus: AppStatusStore) =>
      set((state) => ({ ...state, appStatus })),
    reset: () =>
      set(() => ({
        ...defaultState,
        appStatus: { status: "reset", message: "" }
      })),
    setPayload: (payload: PayloadStore) =>
      set((state) => ({ ...state, payload }))
  }));
};
