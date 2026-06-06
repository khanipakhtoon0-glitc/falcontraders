-- Tighten video_play_events: remove public SELECT and add input validation on INSERT
DROP POLICY IF EXISTS "anyone can read play events" ON public.video_play_events;
DROP POLICY IF EXISTS "anyone can insert play events" ON public.video_play_events;

CREATE POLICY "Public can insert validated play events"
ON public.video_play_events
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(video_id) > 0
  AND length(video_id) <= 100
  AND (user_agent IS NULL OR length(user_agent) <= 500)
  AND (referrer IS NULL OR length(referrer) <= 1000)
);
REVOKE SELECT ON public.video_play_events FROM anon, authenticated;