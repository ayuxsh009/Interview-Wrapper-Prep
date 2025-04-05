"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StepProgress from "../components/StepProgress";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

function QnAPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [qnaData, setQnaData] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetQnA();
  }, []);

  const GetQnA = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Question/Answer",
      });
      setQnaData(result?.data?.content || []);
    } catch (error) {
      console.error("Error fetching Q&A data:", error);
      toast.error("Failed to load Q&A data");
    } finally {
      setLoading(false);
    }
  };

  const goToCoursePage = () => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <h2 className="font-bold text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        Question & Answer
      </h2>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <ClipLoader size={40} color="#3b82f6" />
          <span className="ml-3 text-gray-400">Loading Q&A...</span>
        </div>
      ) : qnaData.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <StepProgress
            data={qnaData}
            stepCount={stepCount}
            setStepCount={(value) => setStepCount(value)}
            darkMode={true}
          />

          <div className="mt-8 space-y-6">
            {/* Question Box */}
            <div className="p-6 bg-gray-800 border border-blue-500/30 rounded-xl shadow-lg">
              <h3 className="font-bold text-xl text-blue-400 mb-3">Question</h3>
              <p className="text-gray-300">
                {qnaData[stepCount]?.question}
              </p>
            </div>

            {/* Answer Box */}
            <div className="p-6 bg-gray-800 border border-green-500/30 rounded-xl shadow-lg">
              <h3 className="font-bold text-xl text-green-400 mb-3">Answer</h3>
              <p className="text-gray-300">
                {qnaData[stepCount]?.answer}
              </p>
            </div>

            {/* Navigation */}
            {stepCount === qnaData.length - 1 ? (
              <div className="flex justify-center mt-8">
                <button
                  onClick={goToCoursePage}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg shadow-lg transition-all duration-300"
                >
                  Go to Course Page
                </button>
              </div>
            ) : (
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStepCount(prev => Math.max(prev - 1, 0))}
                  className="px-4 py-2 border border-blue-500 text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
                  disabled={stepCount === 0}
                >
                  Previous
                </button>
                <button
                  onClick={() => setStepCount(prev => Math.min(prev + 1, qnaData.length - 1))}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <p className="text-xl mb-4">No Q&A data available for this course</p>
          <button
            onClick={GetQnA}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default QnAPage;