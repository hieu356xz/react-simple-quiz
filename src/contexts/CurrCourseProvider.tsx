import { createContext, useState, ReactNode } from "react";
import Course from "../data/Course";

interface ICurrCourseContext {
  currCourse: Course | null;
  setCurrCourse: React.Dispatch<React.SetStateAction<any>>;
}

export const CurrCourseContext = createContext<ICurrCourseContext>({
  currCourse: null,
  setCurrCourse: () => {},
});

const CurrCourseProvider = ({ children }: { children: ReactNode }) => {
  const [currCourse, setCurrCourse] = useState<Course | null>(null);

  return (
    <CurrCourseContext.Provider
      value={{ currCourse: currCourse, setCurrCourse: setCurrCourse }}
    >
      {children}
    </CurrCourseContext.Provider>
  );
};

export default CurrCourseProvider;
