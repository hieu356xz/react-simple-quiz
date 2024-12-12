import { createContext, useState, ReactNode } from "react";

interface ISidebarOpenContext {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarOpenContext = createContext<ISidebarOpenContext>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

const SidebarOpenProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarOpenContext.Provider
      value={{
        isSidebarOpen: isSidebarOpen,
        setIsSidebarOpen: setIsSidebarOpen,
      }}
    >
      {children}
    </SidebarOpenContext.Provider>
  );
};

export { SidebarOpenContext };
export default SidebarOpenProvider;
