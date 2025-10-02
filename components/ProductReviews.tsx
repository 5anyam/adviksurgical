'use client';

import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { toast } from '../hooks/use-toast';

interface Review {
  id: number;
  date_created?: string;
  reviewer: string;
  reviewer_email?: string;
  review: string;
  rating: number;
  images?: string[];
}

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

/** WooCommerce reviews API shape (subset we use) */
interface ApiMetaItem {
  key: string;
  value: unknown;
}
interface ApiReview {
  id: number;
  date_created?: string;
  reviewer?: string;
  reviewer_email?: string;
  review?: string;
  rating?: number;
  meta_data?: ApiMetaItem[];
}

const isApiMetaItem = (m: unknown): m is ApiMetaItem =>
  typeof m === 'object' &&
  m !== null &&
  'key' in m &&
  'value' in m &&
  typeof (m as Record<string, unknown>).key === 'string';

const isApiReview = (r: unknown): r is ApiReview =>
  typeof r === 'object' &&
  r !== null &&
  typeof (r as Record<string, unknown>).id === 'number';

const stripHtml = (html: string): string => {
  if (!html) return '';
  const noP = html.replace(/<\/?p[^>]*>/gi, '\n').replace(/<br\s*\/?>/gi, '\n');
  const text = noP.replace(/<[^>]+>/g, '');
  return text.replace(/\n{3,}/g, '\n\n').trim();
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const [formData, setFormData] = useState<{
    reviewer: string;
    reviewer_email: string;
    review: string;
    rating: number;
  }>({
    reviewer: '',
    reviewer_email: '',
    review: '',
    rating: 0,
  });

  const API_BASE = 'https://cms.edaperfumes.com/wp-json/wc/v3';
  const CONSUMER_KEY = 'ck_b1a13e4236dd41ec9b8e6a1720a69397ddd12da6';
  const CONSUMER_SECRET = 'cs_d8439cfabc73ad5b9d82d1d3facea6711f24dfd1';

  useEffect(() => {
    if (productId) {
      void loadReviews();
    }
  }, [productId]);

  const parseImageUrlsFromMeta = (meta?: ApiMetaItem[]): string[] | undefined => {
    if (!Array.isArray(meta)) return undefined;
    const urlsItem = meta.find((m) => isApiMetaItem(m) && m.key === 'amraj_review_image_urls');
    if (!urlsItem) return undefined;
    const v = urlsItem.value;
    if (Array.isArray(v) && v.every((x) => typeof x === 'string')) {
      return v as string[];
    }
    return undefined;
  };

  const loadReviews = async (): Promise<void> => {
    try {
      setLoading(true);

      const url =
        `${API_BASE}/products/reviews?product=${productId}` +
        `&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}` +
        `&per_page=100&status=approved`;

      const res = await fetch(url);
      if (!res.ok) {
        setReviews([]);
        return;
      }

      const data: unknown = await res.json();
      const list: ApiReview[] = Array.isArray(data) ? data.filter(isApiReview) : [];

      const mapped: Review[] = list.map((rev) => {
        const images = parseImageUrlsFromMeta(rev.meta_data);
        return {
          id: rev.id,
          reviewer: rev.reviewer ? String(rev.reviewer) : 'Anonymous',
          reviewer_email: rev.reviewer_email ? String(rev.reviewer_email) : undefined,
          review: stripHtml(rev.review ? String(rev.review) : ''),
          rating: typeof rev.rating === 'number' ? rev.rating : 0,
          date_created: rev.date_created ? String(rev.date_created) : undefined,
          images,
        };
      });

      setReviews(mapped);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!formData.reviewer || !formData.review || formData.rating === 0) {
      toast({
        title: 'Error',
        description: 'Please fill all fields and select a rating',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    try {
      const url =
        `${API_BASE}/products/reviews?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

      const payload = {
        product_id: productId,
        review: formData.review,
        reviewer: formData.reviewer,
        reviewer_email: formData.reviewer_email || '',
        rating: formData.rating,
        status: 'approved',
      } as const;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errTxt = await res.text();
        throw new Error(errTxt || 'Failed to submit review');
      }

      toast({ title: 'Thank you!', description: 'Review submitted successfully.' });
      setFormData({ reviewer: '', reviewer_email: '', review: '', rating: 0 });
      setShowForm(false);
      await loadReviews();
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to submit review',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = ({
    rating,
    onChange,
    interactive = false,
  }: {
    rating: number;
    onChange?: (value: number) => void;
    interactive?: boolean;
  }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onChange?.(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-default'} transition-transform`}
          aria-label={`Rate ${star}`}
          disabled={!interactive}
        >
          {star <= rating ? (
            <StarIcon className="h-5 w-5 text-amber-400" />
          ) : (
            <StarOutlineIcon className="h-5 w-5 text-gray-300" />
          )}
        </button>
      ))}
    </div>
  );

  const averageRating =
    reviews.length > 0
      ? reviews.reduce<number>((acc, r) => acc + (r.rating || 0), 0) / reviews.length
      : 0;

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-black text-xl sm:text-2xl flex items-center gap-2">
            ⭐ Customer Reviews
          </h2>
          <span className="text-white/90 text-xs sm:text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <StarRating rating={Math.round(averageRating)} />
          <span className="text-white font-bold text-lg sm:text-xl">
            {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}
          </span>
          <span className="text-white/80 text-sm">out of 5</span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {showForm ? '✖ Cancel' : '✍️ Write Your Review'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={submitReview} className="mb-8 p-6 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Share Your Experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.reviewer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((s) => ({ ...s, reviewer: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email (optional)</label>
                <input
                  type="email"
                  value={formData.reviewer_email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((s) => ({ ...s, reviewer_email: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Rating *</label>
              <StarRating
                rating={formData.rating}
                onChange={(v: number) => setFormData((s) => ({ ...s, rating: v }))}
                interactive
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Review *</label>
              <textarea
                required
                value={formData.review}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData((s) => ({ ...s, review: e.target.value }))
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm resize-none transition-all"
                placeholder="Tell us about your experience with this fragrance..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg ${
                submitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Submitting…' : '✨ Submit Review'}
            </button>
          </form>
        )}

        {/* Reviews */}
        {loading ? (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-rose-500 border-t-transparent mx-auto"></div>
            <p className="text-gray-600 text-sm mt-3 font-medium">Loading reviews…</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-6xl mb-3">🌹</div>
            <p className="text-gray-900 text-lg font-bold mb-1">No reviews yet</p>
            <p className="text-gray-600 text-sm">Be the first to review {productName}!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="p-5 sm:p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-rose-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center border-2 border-rose-200">
                      <span className="text-rose-600 font-bold text-lg">
                        {(r.reviewer || 'A')[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900 text-sm sm:text-base">
                          {r.reviewer || 'Anonymous'}
                        </p>
                        <CheckBadgeIcon className="h-5 w-5 text-rose-500" title="Verified Purchase" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={r.rating || 0} />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                  {stripHtml(r.review || '')}
                </p>

                {Array.isArray(r.images) && r.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {r.images.map((src, i) => (
                      <img
                        key={`${r.id}-${i}`}
                        src={src}
                        alt="Review photo"
                        className="w-full h-24 sm:h-28 object-cover rounded-lg border-2 border-gray-200 hover:border-rose-300 transition-all cursor-pointer hover:scale-105"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
