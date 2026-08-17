-- Add User role
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

ALTER TABLE "User"
ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE INDEX "User_role_idx" ON "User"("role");
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- Anime
CREATE TYPE "AnimeStatus" AS ENUM ('ONGOING', 'COMPLETED', 'UPCOMING', 'HIATUS');
CREATE TYPE "AnimeType" AS ENUM ('TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL');

CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "synopsis" TEXT,
    "posterUrl" TEXT,
    "bannerUrl" TEXT,
    "trailerUrl" TEXT,
    "type" "AnimeType" NOT NULL DEFAULT 'TV',
    "status" "AnimeStatus" NOT NULL DEFAULT 'ONGOING',
    "releaseYear" INTEGER,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Anime_slug_key" ON "Anime"("slug");
CREATE INDEX "Anime_status_idx" ON "Anime"("status");
CREATE INDEX "Anime_type_idx" ON "Anime"("type");
CREATE INDEX "Anime_releaseYear_idx" ON "Anime"("releaseYear");
CREATE INDEX "Anime_viewCount_idx" ON "Anime"("viewCount");
CREATE INDEX "Anime_averageRating_idx" ON "Anime"("averageRating");
CREATE INDEX "Anime_createdAt_idx" ON "Anime"("createdAt");

-- Genre
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");

-- Season
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT,
    "synopsis" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Season_animeId_number_key" ON "Season"("animeId", "number");
CREATE INDEX "Season_animeId_idx" ON "Season"("animeId");

-- Episode
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT,
    "thumbnailUrl" TEXT,
    "duration" INTEGER,
    "airDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Episode_seasonId_number_key" ON "Episode"("seasonId", "number");
CREATE INDEX "Episode_seasonId_idx" ON "Episode"("seasonId");
CREATE INDEX "Episode_airDate_idx" ON "Episode"("airDate");

-- Episode sources
CREATE TABLE "EpisodeSource" (
    "id" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "quality" TEXT,
    "language" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EpisodeSource_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "EpisodeSource_episodeId_idx" ON "EpisodeSource"("episodeId");

-- Anime genres
CREATE TABLE "AnimeGenre" (
    "animeId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "AnimeGenre_pkey" PRIMARY KEY ("animeId", "genreId")
);

CREATE INDEX "AnimeGenre_genreId_idx" ON "AnimeGenre"("genreId");

-- Favorites
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Favorite_userId_animeId_key" ON "Favorite"("userId", "animeId");
CREATE INDEX "Favorite_userId_createdAt_idx" ON "Favorite"("userId", "createdAt");
CREATE INDEX "Favorite_animeId_createdAt_idx" ON "Favorite"("animeId", "createdAt");

-- Watch history
CREATE TABLE "WatchHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WatchHistory_userId_episodeId_key" ON "WatchHistory"("userId", "episodeId");
CREATE INDEX "WatchHistory_userId_watchedAt_idx" ON "WatchHistory"("userId", "watchedAt");
CREATE INDEX "WatchHistory_animeId_watchedAt_idx" ON "WatchHistory"("animeId", "watchedAt");

-- Ratings
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Rating_userId_animeId_key" ON "Rating"("userId", "animeId");
CREATE INDEX "Rating_animeId_value_idx" ON "Rating"("animeId", "value");

-- Comments
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "parentId" TEXT,
    "body" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Comment_animeId_createdAt_idx" ON "Comment"("animeId", "createdAt");
CREATE INDEX "Comment_userId_createdAt_idx" ON "Comment"("userId", "createdAt");
CREATE INDEX "Comment_parentId_idx" ON "Comment"("parentId");

-- Comment likes
CREATE TABLE "CommentLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CommentLike_userId_commentId_key" ON "CommentLike"("userId", "commentId");
CREATE INDEX "CommentLike_commentId_idx" ON "CommentLike"("commentId");

-- Foreign keys
ALTER TABLE "AnimeGenre"
ADD CONSTRAINT "AnimeGenre_animeId_fkey"
FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AnimeGenre"
ADD CONSTRAINT "AnimeGenre_genreId_fkey"
FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Season"
ADD CONSTRAINT "Season_animeId_fkey"
FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Episode"
ADD CONSTRAINT "Episode_seasonId_fkey"
FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "EpisodeSource"
ADD CONSTRAINT "EpisodeSource_episodeId_fkey"
FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Favorite"
ADD CONSTRAINT "Favorite_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Favorite"
ADD CONSTRAINT "Favorite_animeId_fkey"
FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WatchHistory"
ADD CONSTRAINT "WatchHistory_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WatchHistory"
ADD CONSTRAINT "WatchHistory_animeId_fkey"
FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WatchHistory"
ADD CONSTRAINT "WatchHistory_episodeId_fkey"
FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Rating"
ADD CONSTRAINT "Rating_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Rating"
ADD CONSTRAINT "Rating_animeId_fkey"
FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Comment"
ADD CONSTRAINT "Comment_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Comment"
ADD CONSTRAINT "Comment_animeId_fkey"
FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Comment"
ADD CONSTRAINT "Comment_parentId_fkey"
FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CommentLike"
ADD CONSTRAINT "CommentLike_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CommentLike"
ADD CONSTRAINT "CommentLike_commentId_fkey"
FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
