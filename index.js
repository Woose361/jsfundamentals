// Task to complete in JavaScript code:
// 1.We need to create one array of objects containing data for each learner in this course.
// Each object will represent the learners id: 125 and id: 132.
// 2.Each object needs to contain the following information: id., weighted average score (percentage),
// a dictionary of assignment IDs as keys, with both percentage scores as values.
// 3.We will Exclude assignments not yet due. If an assignment is not yet due, do not include it in the results or the average.
// 4.If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid.
// 5.You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero.
// 6.What if a value that you are expecting to be a number is instead a string? Use try/catch and other logic to handle these types of errors gracefully.
// 7.Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
// 8.Create a function named getLearnerData() that accepts these values as parameters, in the order listed:
// (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above.

const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  },
];
function getLearnerData(course, ag, submissions) {
  try {
    if (ag.course_id !== course.id) {
      throw new Error("Assignment group course_id does not match CourseInfo id");
    }

    for (let assignment of ag.assignments) {
      if (assignment.points_possible === 0) {
        throw new Error("Points possible for assignment cannot be zero");
      }
    }

    const results = [];
    const learners = [125, 132];
  



    for (let learner of learners) {
      let totalScore = 0;
      let totalPoints = 0;
      const scores = {};

      for (let assignment of ag.assignments) {
        const submission = submissions.find(sub => sub.learner_id === learner && sub.assignment_id === assignment.id);

        if (submission) {
          const dueDate = new Date(assignment.due_at);
          const submitDate = new Date(submission.submission.submitted_at);

          let score = submission.submission.score;

          
        if (submitDate > dueDate) {
            score -= assignment.points_possible * 0.1; 
          if (score < 0){
            score = 0;
          }
          else{
            // if  not late, go to next assignment
            continue;
          }
          }

          if (score < 0) {
            score = 0; 
          }

          scores[assignment.id] = score / assignment.points_possible;
          totalScore += score;
          totalPoints += assignment.points_possible;
        }
      else{
        // if no submission, go to next assignment
        continue;
      } 
    }

      if (totalPoints === 0) {
        throw new Error("Total points possible cannot be zero");
      }

      const avg = totalScore / totalPoints;
      const result = { id: learner, avg: avg.toFixed(3), ...scores };
      results.push(result);
    }

    return results;

  } catch (error) {
    console.error(error.message);
  }
}
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions); 

console.log("Final Results Are", result);




