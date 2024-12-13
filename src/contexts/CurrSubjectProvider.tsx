import { createContext, useState, useEffect, ReactNode } from "react";
import Subject from "../data/Subject";
import QueryDb from "../data/QueryDb";

interface ICurrSubjectContext {
  currSubject: Subject | null;
  setCurrSubject: React.Dispatch<React.SetStateAction<any>>;
}

export const CurrSubjectContext = createContext<ICurrSubjectContext>({
  currSubject: null,
  setCurrSubject: () => {},
});

const CurrSubjectProvider = ({ children }: { children: ReactNode }) => {
  const [currSubject, setCurrSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await QueryDb(
          `select *
          from Subjects 
          where SemesterID = (select ID 
                              from Semesters 
                              where ID = 6)
          limit 1`
        );

        const subject = new Subject(JSON.parse(data)[0]);
        setCurrSubject(subject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <CurrSubjectContext.Provider
      value={{ currSubject: currSubject, setCurrSubject: setCurrSubject }}
    >
      {children}
    </CurrSubjectContext.Provider>
  );
};

export default CurrSubjectProvider;
