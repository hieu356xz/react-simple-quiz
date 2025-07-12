CREATE TABLE Semester (
    id int PRIMARY KEY,
    name nvarchar
);

CREATE TABLE Subject (
    id int PRIMARY KEY,
    name nvarchar,
    semester_id int NOT NULL,
    FOREIGN KEY (semester_id) REFERENCES Semester(id)
);

CREATE TABLE Question (
    id int PRIMARY KEY,
    question_direction nvarchar,
    question_type nvarchar,
    answer_option nvarchar,
    correct_answer nvarchar,
    cdr int,
    shuffleable int,
    group_id int
);

CREATE TABLE Course (
    id int PRIMARY KEY,
    name nvarchar,
    subject_id int NOT NULL, 
    questions nvarchar,
    question_per_test int,
    FOREIGN KEY (subject_id) REFERENCES Subject(id)
);

CREATE TRIGGER Question_QuestionType_Check_Insert
BEFORE INSERT ON Question
BEGIN
    SELECT
        CASE WHEN NEW.question_type != 'checkbox' AND NEW.question_type != 'radio'
        AND NEW.question_type != 'drag_drop' THEN
            RAISE (ABORT, 'question_type can only be checkbox or radio')
        END;
END;

CREATE TRIGGER Question_question_type_Check_Update
BEFORE UPDATE ON Question
BEGIN
    SELECT
        CASE WHEN NEW.question_type != 'checkbox' AND NEW.question_type != 'radio'
        AND NEW.question_type != 'drag_drop' THEN
            RAISE (ABORT, 'QuestionType can only be checkbox or radio')
        END;
END;