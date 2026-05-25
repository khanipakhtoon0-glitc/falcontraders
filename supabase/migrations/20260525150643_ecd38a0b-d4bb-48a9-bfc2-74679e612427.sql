
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit a review"
  ON public.reviews FOR INSERT
  WITH CHECK (
    length(trim(name)) > 0 AND length(name) <= 100
    AND length(trim(message)) > 0 AND length(message) <= 1000
    AND rating >= 1 AND rating <= 5
  );

ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
ALTER TABLE public.reviews REPLICA IDENTITY FULL;
