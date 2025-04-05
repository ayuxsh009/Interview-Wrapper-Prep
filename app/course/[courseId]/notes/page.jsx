"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });

      const parsedNotes = result?.data?.notes.map((note) => ({
        ...note,
        notes: note.notes,
      }));

      console.log("Parsed Notes:", parsedNotes);
      setNotes(parsedNotes || []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  const styleContent = (content) => {
    content = content
      .replace(/^```html/g, "")
      .replace(/'''$/g, "")
      .trim();
    return content
      .replace(
        /<h3>/g,
        `<h3 class="text-2xl font-semibold text-gray-100 mb-3">`
      )
      .replace(
        /<h4>/g,
        `<h4 class="text-xl font-medium text-gray-300 mb-2">`
      )
      .replace(
        /<p>/g,
        `<p class="text-base text-gray-400 leading-relaxed mb-4">`
      )
      .replace(
        /<li>/g,
        `<li class="text-base text-gray-400 leading-relaxed mb-2 ml-4 list-disc">`
      )
      .replace(
        /<ul>/g,
        `<ul class="mb-4">`
      )
      .replace(
        /<ol>/g,
        `<ol class="mb-4 list-decimal">`
      );
  };

  if (!Array.isArray(notes)) {
    return <div className="text-gray-400 p-4">No notes available</div>;
  }

  return notes.length > 0 ? (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation controls */}
        <div className="flex gap-4 items-center mb-8 p-4 bg-gray-800 rounded-lg">
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500 text-blue-400 hover:bg-blue-900/50 hover:text-blue-300"
            onClick={() => setStepCount((prev) => Math.max(prev - 1, 0))}
          >
            Previous
          </Button>
          
          <div className="flex-1 flex gap-2">
            {notes.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full flex-1 ${
                  index < stepCount ? "bg-blue-600" : "bg-gray-700"
                }`}
              ></div>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500 text-blue-400 hover:bg-blue-900/50 hover:text-blue-300"
            onClick={() =>
              setStepCount((prev) => Math.min(prev + 1, notes.length - 1))
            }
          >
            Next
          </Button>
        </div>

        {/* Notes content */}
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: styleContent(notes[stepCount].notes),
            }}
          ></div>

          {stepCount === notes.length - 1 && (
            <div className="mt-12 flex flex-col items-center gap-6">
              <h2 className="text-2xl font-semibold text-gray-200">End of notes</h2>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.back()}
              >
                Go to course page
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center text-gray-400 bg-gray-900">
      No notes available
    </div>
  );
}

export default ViewNotes;