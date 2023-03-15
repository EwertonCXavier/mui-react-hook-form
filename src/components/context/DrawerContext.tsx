import { useContext, createContext, useCallback, useState } from 'react';

interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

interface IDrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({
  children,
}) => {
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        toggleDrawerOpen,
        setDrawerOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
