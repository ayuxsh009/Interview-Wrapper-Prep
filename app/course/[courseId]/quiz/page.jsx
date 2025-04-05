"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StepProgress from "../components/StepProgress";
import QuizCardItem from "./_components/QuizCardItem";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

function Quiz() {
  const { courseId } = useParams();
  const router = useRouter();
  const [quizData, setQuizData] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    GetQuiz();
  }, []);

  const GetQuiz = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Quiz",
      });
      const questions = result?.data?.content?.questions || [];
      setQuiz(questions);
      setQuizData(result.data);

      if (questions.length > 0) {
        setCorrectAnswer(questions[0]?.answer);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      toast.error("Failed to fetch quiz data");
    } finally {
      setIsLoading(false);
    }
  };

  const checkAnswer = (userAnswer, currentQuestion) => {
    setSelectedOption(userAnswer);
    if (userAnswer === currentQuestion.answer) {
      setIsCorrectAnswer(true);
      setCorrectAnswer(currentQuestion.answer);
      toast.success("Correct answer!");
    } else {
      setIsCorrectAnswer(false);
      toast.error("Incorrect answer");
    }
  };

  useEffect(() => {
    if (quiz.length > 0) {
      setCorrectAnswer(quiz[stepCount]?.answer);
      setIsCorrectAnswer(null);
      setSelectedOption(null);
    }
  }, [stepCount, quiz]);

  const goToCoursePage = () => {
    router.push(`/course/${courseId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <ClipLoader size={50} color="#3b82f6" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-bold text-3xl md:text-4xl mb-8 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Quiz
        </h2>

        {quiz.length > 0 ? (
          <div className="space-y-8">
            <StepProgress
              data={quiz}
              stepCount={stepCount}
              setStepCount={setStepCount}
            />

            <QuizCardItem
              quiz={quiz[stepCount]}
              userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
              selectedOption={selectedOption}
              correctAnswer={correctAnswer}
            />

            {isCorrectAnswer === false && (
              <div className="p-4 border border-red-500 bg-red-900/30 rounded-lg mt-4">
                <h2 className="font-bold text-lg text-red-400">Incorrect</h2>
                <p className="text-red-300">
                  Correct answer: <span className="font-semibold">{correctAnswer}</span>
                </p>
              </div>
            )}

            {isCorrectAnswer === true && (
              <div className="p-4 border border-green-500 bg-green-900/30 rounded-lg">
                <h2 className="font-bold text-lg text-green-400">Correct!</h2>
                <p className="text-green-300">Well done!</p>
              </div>
            )}

            {stepCount === quiz.length - 1 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={goToCoursePage}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg shadow-lg transition-all duration-300"
                >
                  Finish Quiz
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No quiz questions available</p>
            <button
              onClick={GetQuiz}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;