
CREATE TABLE public.video_play_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent TEXT,
  referrer TEXT
);
GRANT SELECT, INSERT ON public.video_play_events TO anon, authenticated;
GRANT ALL ON public.video_play_events TO service_role;
ALTER TABLE public.video_play_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can insert play events" ON public.video_play_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anyone can read play events" ON public.video_play_events FOR SELECT TO anon, authenticated USING (true);
