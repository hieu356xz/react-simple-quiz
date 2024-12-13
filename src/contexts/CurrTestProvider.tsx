import { createContext, useState, ReactNode } from "react";
import Test from "../data/Test";

interface ICurrTestContext {
  currTest: Test | null;
  setCurrTest: React.Dispatch<React.SetStateAction<any>>;
}

export const CurrTestContext = createContext<ICurrTestContext>({
  currTest: null,
  setCurrTest: () => {},
});

const CurrTestProvider = ({ children }: { children: ReactNode }) => {
  const [currTest, setCurrTest] = useState<Test | null>(null);

  return (
    <CurrTestContext.Provider
      value={{ currTest: currTest, setCurrTest: setCurrTest }}
    >
      {children}
    </CurrTestContext.Provider>
  );
};

export default CurrTestProvider;
