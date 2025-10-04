"use client";

import { useState, useTransition } from "react";
import { addOrUpdateReview } from "@/lib/actions/reviewActions";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateServiceRating } from "@/lib/actions/server";

export default function ReviewForm({
  serviceId,
  existingReview,
}: {
  serviceId: string;
  existingReview?: { rating: number; comment?: string };
}) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await addOrUpdateReview(serviceId, rating, comment);
        await updateServiceRating(serviceId);
        setMessage("Your review has been saved ✅");
      } catch (err: any) {
        setMessage(err.message || "Failed to submit review");
      }
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow mt-6"
    >
      <h3 className="text-xl font-bold mb-4">Leave a Review</h3>

      {/* Rating Stars */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onClick={() => setRating(star)}
            className={`h-8 w-8 cursor-pointer ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        className="w-full border rounded-lg p-2 mb-4"
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {isPending ? "Saving..." : "Submit Review"}
      </button>

      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </form>
  );
}
