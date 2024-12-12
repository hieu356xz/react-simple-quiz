CREATE TABLE Semesters (
    ID int PRIMARY KEY,
    Name nvarchar
);

CREATE TABLE Subjects (
    ID int PRIMARY KEY,
    Name nvarchar,
    SemesterID int NOT NULL,
    FOREIGN KEY (SemesterID) REFERENCES Semesters(ID)
);

CREATE TABLE Questions (
    ID int PRIMARY KEY,
    QuestionText nvarchar,
    AnswerOptions nvarchar,
    CorrectAnswers nvarchar,
    QuestionType nvarchar,
    Cdr int,
    Shuffleable int
);

CREATE TABLE Tests (
    ID int PRIMARY KEY,
    Name nvarchar,
    SubjectID int NOT NULL, 
    QuestionsID nvarchar,
    FOREIGN KEY (SubjectID) REFERENCES Subjects(ID)
);

CREATE TRIGGER Questions_QuestionType_Check_Insert
BEFORE INSERT ON Questions
BEGIN
    SELECT
        CASE WHEN NEW.QuestionType != 'checkbox' OR NEW.QuestionType != 'radio' THEN
            RAISE (ABORT, 'QuestionType can only be checkbox or radio')
        END;
END;

CREATE TRIGGER Questions_QuestionType_Check_Update
BEFORE UPDATE ON Questions
BEGIN
    SELECT
        CASE WHEN NEW.QuestionType != 'checkbox' OR NEW.QuestionType != 'radio' THEN
            RAISE (ABORT, 'QuestionType can only be checkbox or radio')
        END;
END;
