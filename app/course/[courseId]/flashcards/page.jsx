"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "./_components/FlashcardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

function Flashcards() {
  const { courseId } = useParams();
  const [flashCards, setFlashCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [api, setApi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetFlashCards();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      setIsFlipped(false);
    });
  }, [api]);

  const GetFlashCards = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Flashcard",
      });
      setFlashCards(result?.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      toast.error("Failed to load flashcards");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <ClipLoader size={50} color="#3b82f6" />
        <span className="ml-4 text-gray-400">Loading flashcards...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Flashcards
          </h2>
          <p className="text-gray-400 mt-2 text-lg">
            The ultimate tool to lock in concepts!
          </p>
        </div>

        {flashCards?.content?.length > 0 ? (
          <div className="mt-12">
            <Carousel 
              setApi={setApi}
              className="relative"
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4">
                {flashCards.content.map((flashcard, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-2">
                      <FlashcardItem
                        isFlipped={isFlipped}
                        handleClick={handleClick}
                        flashcard={flashcard}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white" />
            </Carousel>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-xl mb-4">No flashcards available</p>
            <button 
              onClick={GetFlashCards}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Flashcards;