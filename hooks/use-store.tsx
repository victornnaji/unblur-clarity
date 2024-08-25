"use client";
import { AppStore, createAppStore } from "@/utils/store";
import { type StoreApi, useStore } from "zustand";
import { type ReactNode, createContext, useRef, useContext } from "react";

export const AppStoreContext = createContext<StoreApi<AppStore> | null>(null);

type RestorationProviderProps = {
  children: ReactNode;
};

export const AppStoreProvider = ({ children }: RestorationProviderProps) => {
  const storeRef = useRef<StoreApi<AppStore>>();
  if (!storeRef.current) {
    storeRef.current = createAppStore();
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within a RestorationProvider");
  }

  return useStore(context, selector);
};
