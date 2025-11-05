import { QueryDbNode } from "./SQLDatabaseNode";

interface QuestionViolation {
  questionId: number;
  questionDirection: string;
  subjects: {
    subjectId: number;
    subjectName: string;
    courses: {
      courseId: number;
      courseName: string;
    }[];
  }[];
}

const validateQuestions = async (): Promise<QuestionViolation[]> => {
  try {
    // Get all questions with their associated courses and subjects
    const query = `
      SELECT DISTINCT
        q.id as question_id,
        q.question_direction,
        c.id as course_id,
        c.name as course_name,
        c.subject_id,
        s.name as subject_name
      FROM Question q,
           Course c,
           Subject s,
           json_each(c.questions) as je
      WHERE je.value = q.id
        AND c.subject_id = s.id
      ORDER BY q.id, s.id
    `;

    const results = await QueryDbNode(query);
    const data = JSON.parse(results as unknown as string);

    // Group by question ID
    const questionMap = new Map<
      number,
      {
        questionDirection: string;
        subjects: Map<
          number,
          {
            subjectId: number;
            subjectName: string;
            courses: { courseId: number; courseName: string }[];
          }
        >;
      }
    >();

    data.forEach((row: any) => {
      const questionId = row.question_id;
      const subjectId = row.subject_id;

      if (!questionMap.has(questionId)) {
        questionMap.set(questionId, {
          questionDirection: row.question_direction,
          subjects: new Map(),
        });
      }

      const question = questionMap.get(questionId)!;

      if (!question.subjects.has(subjectId)) {
        question.subjects.set(subjectId, {
          subjectId: subjectId,
          subjectName: row.subject_name,
          courses: [],
        });
      }

      const subject = question.subjects.get(subjectId)!;

      // Check if course already exists to avoid duplicates
      const existingCourse = subject.courses.find(
        (c) => c.courseId === row.course_id
      );
      if (!existingCourse) {
        subject.courses.push({
          courseId: row.course_id,
          courseName: row.course_name,
        });
      }
    });

    // Find violations (questions appearing in multiple subjects)
    const violations: QuestionViolation[] = [];

    questionMap.forEach((questionData, questionId) => {
      if (questionData.subjects.size > 1) {
        violations.push({
          questionId,
          questionDirection: questionData.questionDirection,
          subjects: Array.from(questionData.subjects.values()),
        });
      }
    });

    return violations;
  } catch (error) {
    console.error("Error validating questions:", error);
    return [];
  }
};

// Function to generate a detailed report
const generateReport = async () => {
  console.log(
    "🔍 Checking for questions that appear across multiple subjects...\n"
  );

  const violations = await validateQuestions();

  if (violations.length === 0) {
    console.log(
      "✅ No violations found! All questions are properly contained within their subjects."
    );
    return;
  }

  console.log(
    `❌ Found ${violations.length} questions that appear in multiple subjects:\n`
  );

  violations.forEach((violation, index) => {
    console.log(`${index + 1}. Question ID: ${violation.questionId}`);

    // Clean up the question direction for display
    const cleanDirection = violation.questionDirection
      .replace(/<!--.*?-->/g, "")
      .replace(/<[^>]*>/g, "")
      .trim();

    console.log(
      `   Direction: ${cleanDirection.substring(0, 100)}${
        cleanDirection.length > 100 ? "..." : ""
      }`
    );
    console.log(`   Appears in ${violation.subjects.length} subjects:`);

    violation.subjects.forEach((subject) => {
      console.log(
        `   📚 Subject: ${subject.subjectName} (ID: ${subject.subjectId})`
      );
      subject.courses.forEach((course) => {
        console.log(
          `      📖 Course: ${course.courseName} (ID: ${course.courseId})`
        );
      });
    });
    console.log("");
  });

  console.log(`\n📊 Summary: ${violations.length} questions need to be fixed.`);

  return violations;
};

// Function to generate SQL fix script
const generateFixScript = async () => {
  const violations = await validateQuestions();

  if (violations.length === 0) {
    console.log("No fix needed - no violations found.");
    return;
  }

  console.log("-- SQL Script to fix question violations");
  console.log(
    "-- Remove questions from courses in subjects where they should not appear\n"
  );

  violations.forEach((violation, index) => {
    const cleanDirection = violation.questionDirection
      .replace(/<!--.*?-->/g, "")
      .replace(/<[^>]*>/g, "")
      .trim();

    console.log(`-- ${index + 1}. Question ID: ${violation.questionId}`);
    console.log(
      `-- Direction: ${cleanDirection.substring(0, 100)}${
        cleanDirection.length > 100 ? "..." : ""
      }`
    );
    console.log(
      "-- Choose which subject to keep the question in, then run the appropriate UPDATE statements:\n"
    );

    violation.subjects.forEach((subject) => {
      console.log(
        `-- Option: Keep question in subject "${subject.subjectName}" (ID: ${subject.subjectId})`
      );

      // Generate UPDATE statements to remove from other subjects
      const otherSubjects = violation.subjects.filter(
        (s) => s.subjectId !== subject.subjectId
      );
      otherSubjects.forEach((otherSubject) => {
        otherSubject.courses.forEach((course) => {
          console.log(`--   Remove from course "${course.courseName}"`);
          console.log(`UPDATE Course SET questions = json_remove(questions, (
  SELECT '[' || key || ']' 
  FROM json_each(questions) 
  WHERE value = ${violation.questionId}
)) WHERE id = ${course.courseId};`);
          console.log("");
        });
      });
      console.log("");
    });
    console.log("-- " + "=".repeat(80) + "\n");
  });
};

// Function to count questions per subject
const getQuestionStats = async () => {
  try {
    const query = `
      SELECT 
        s.id as subject_id,
        s.name as subject_name,
        COUNT(DISTINCT je.value) as question_count,
        COUNT(DISTINCT c.id) as course_count
      FROM Subject s
      JOIN Course c ON c.subject_id = s.id
      JOIN json_each(c.questions) as je
      GROUP BY s.id, s.name
      ORDER BY s.name
    `;

    const results = await QueryDbNode(query);
    const data = JSON.parse(results as unknown as string);

    console.log("📊 Question distribution by subject:\n");
    data.forEach((row: any) => {
      console.log(`📚 ${row.subject_name}`);
      console.log(`   Questions: ${row.question_count}`);
      console.log(`   Courses: ${row.course_count}`);
      console.log("");
    });

    return data;
  } catch (error) {
    console.error("Error getting question stats:", error);
    return [];
  }
};

export {
  validateQuestions,
  generateReport,
  generateFixScript,
  getQuestionStats,
};
