import { createContext, useState, ReactNode } from "react";
import Subject from "../data/Subject";

interface ICurrSubjectContext {
  currSubject: Subject | null;
  setCurrSubject: React.Dispatch<React.SetStateAction<any>>;
}

export const CurrSubjectContext = createContext<ICurrSubjectContext>({
  currSubject: null,
  setCurrSubject: () => {},
});

const CurrSubjectProvider = ({ children }: { children: ReactNode }) => {
  const [currSubject, setCurrSubject] = useState({
    ID: 1,
    Name: "TES1231231311313123124124124T",
    SemesterID: 1,
  });

  return (
    <CurrSubjectContext.Provider
      value={{ currSubject: currSubject, setCurrSubject: setCurrSubject }}
    >
      {children}
    </CurrSubjectContext.Provider>
  );
};

export default CurrSubjectProvider;
