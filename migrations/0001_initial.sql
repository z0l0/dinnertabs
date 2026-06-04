create table if not exists search_events (
  id text primary key,
  created_at text not null,
  anonymous_visitor_id text,
  city_slug text not null,
  date text not null,
  time_bucket text not null,
  time_window_label text not null,
  party_size_bucket text not null,
  normalized_tags text not null
);

create table if not exists source_launch_events (
  id text primary key,
  created_at text not null,
  launch_session_id text not null,
  anonymous_visitor_id text,
  city_slug text not null,
  date text not null,
  time_bucket text not null,
  party_size_bucket text not null,
  normalized_tags text not null,
  launch_mode text not null,
  source_ids text not null
);

create table if not exists source_feedback_events (
  id text primary key,
  created_at text not null,
  launch_session_id text not null,
  source_id text,
  anonymous_visitor_id text,
  city_slug text not null,
  date text not null,
  date_bucket text not null,
  time_bucket text not null,
  time_window_label text not null,
  party_size_bucket text not null,
  normalized_tags text not null,
  source_outcome text,
  source_reaction text,
  outcome text,
  most_useful_source_id text
);

create table if not exists trend_buckets (
  bucket_key text primary key,
  city_slug text not null,
  date text not null,
  time_bucket text not null,
  time_window_label text not null,
  party_size_bucket text not null,
  normalized_tags text not null,
  search_count integer not null default 0,
  launch_count integer not null default 0,
  feedback_count integer not null default 0,
  most_opened_source_ids text not null default '[]',
  updated_at text not null
);

create table if not exists source_insight_buckets (
  bucket_key text primary key,
  city_slug text not null,
  date_bucket text not null,
  time_bucket text not null,
  party_size_bucket text not null,
  normalized_tags text not null,
  source_id text not null,
  opened_count integer not null default 0,
  thumbs_up_count integer not null default 0,
  thumbs_down_count integer not null default 0,
  positive_checkin_count integer not null default 0,
  maybe_revisit_count integer not null default 0,
  nothing_good_count integer not null default 0,
  updated_at text not null
);

create table if not exists user_shared_place_signals (
  id text primary key,
  created_at text not null,
  city_slug text not null,
  date_bucket text not null,
  time_bucket text not null,
  party_size_bucket text not null,
  normalized_tags text not null,
  normalized_place_name text not null,
  display_place_name text not null,
  source_id text,
  consent_version text not null,
  status text not null default 'pending_review'
);

create table if not exists public_insight_summaries (
  cache_key text primary key,
  module text not null,
  city_slug text,
  date_bucket text,
  time_bucket text,
  normalized_tags text not null default '[]',
  summary_json text not null,
  event_count integer not null,
  generated_at text not null,
  expires_at text not null
);

create index if not exists idx_search_events_lookup on search_events (city_slug, date, time_bucket);
create index if not exists idx_trend_buckets_lookup on trend_buckets (city_slug, date, search_count);
create index if not exists idx_source_insights_lookup on source_insight_buckets (city_slug, date_bucket, time_bucket);
