"use client";

import { useMemo, useState } from "react";
import { novel } from "@/lib/novel";
import type { Chapter } from "@/lib/novel";
import styles from "./novel-reader.module.css";

type ChapterEdge = {
  current: Chapter;
  previous?: Chapter;
  next?: Chapter;
};

const buildEdges = (chapters: Chapter[]): Record<string, ChapterEdge> =>
  chapters.reduce<Record<string, ChapterEdge>>((edges, chapter, index) => {
    edges[chapter.slug] = {
      current: chapter,
      previous: chapters[index - 1],
      next: chapters[index + 1]
    };
    return edges;
  }, {});

export function NovelReader() {
  const [activeSlug, setActiveSlug] = useState(novel.chapters[0]?.slug ?? "");
  const edges = useMemo(() => buildEdges(novel.chapters), []);
  const activeEdge = edges[activeSlug] ?? {
    current: novel.chapters[0],
    previous: undefined,
    next: novel.chapters[1]
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <header className={styles.sidebarHeader}>
          <span className={styles.seriesLabel}>Original Web Novel</span>
          <h1>{novel.title}</h1>
          <p className={styles.subtitle}>{novel.subtitle}</p>
          <p className={styles.blurb}>{novel.blurb}</p>
        </header>

        <section className={styles.themes}>
          <h2>Themes</h2>
          <ul>
            {novel.themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
        </section>

        <section className={styles.chapterIndex}>
          <h2>Chapters</h2>
          <ul>
            {novel.chapters.map((chapter) => {
              const isActive = chapter.slug === activeSlug;
              return (
                <li key={chapter.slug}>
                  <button
                    type="button"
                    className={isActive ? styles.activeChapter : styles.chapterButton}
                    onClick={() => setActiveSlug(chapter.slug)}
                  >
                    <span className={styles.chapterOrder}>
                      {chapter.order.toString().padStart(2, "0")}
                    </span>
                    <div className={styles.chapterDetails}>
                      <strong>{chapter.title}</strong>
                      <span>{chapter.tagline}</span>
                    </div>
                    <span className={styles.readLength}>{chapter.lengthEstimate}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </aside>

      <main className={styles.reader}>
        <article>
          <header className={styles.chapterHeader}>
            <span className={styles.chapterBadge}>
              Chapter {activeEdge.current.order.toString().padStart(2, "0")}
            </span>
            <h2>{activeEdge.current.title}</h2>
            <p className={styles.tagline}>{activeEdge.current.tagline}</p>
            <p className={styles.summary}>{activeEdge.current.summary}</p>
          </header>

          <div className={styles.chapterBody}>
            {activeEdge.current.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>

        <nav className={styles.pagination}>
          <button
            type="button"
            onClick={() => activeEdge.previous && setActiveSlug(activeEdge.previous.slug)}
            disabled={!activeEdge.previous}
            className={styles.navButton}
          >
            <span>Previous</span>
            <strong>{activeEdge.previous?.title ?? "—"}</strong>
          </button>
          <button
            type="button"
            onClick={() => activeEdge.next && setActiveSlug(activeEdge.next.slug)}
            disabled={!activeEdge.next}
            className={styles.navButton}
          >
            <span>Next</span>
            <strong>{activeEdge.next?.title ?? "—"}</strong>
          </button>
        </nav>
      </main>
    </div>
  );
}
