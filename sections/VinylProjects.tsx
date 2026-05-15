import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS_DATA } from '../data/vinylProjectData';

type MediaType = 'image' | 'video' | 'pdf' | 'poster';

interface MediaAsset {
  id: string;
  type: MediaType;
  src: string;
  label: string;
}

interface ProjectViewModel {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  color: string;
  cover: string;
  tools: string[];
  media: MediaAsset[];
}

const isVideo = (url: string) => /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
const isPdf = (url: string) => /\.pdf(\?|$)/i.test(url);
const isPoster = (url: string) => /\.(gif|webp)(\?|$)/i.test(url);

const detectMediaType = (url: string): MediaType => {
  if (isPdf(url)) return 'pdf';
  if (isVideo(url)) return 'video';
  if (isPoster(url)) return 'poster';
  return 'image';
};

const mediaTypeLabel: Record<MediaType, string> = {
  image: 'JPEG / PNG',
  video: 'VIDEO',
  pdf: 'PDF',
  poster: 'DYNAMIC POSTER',
};

const normalizeProjects = (): ProjectViewModel[] => {
  return (PROJECTS_DATA as any[]).map((project, index) => {
    const mediaSources: string[] = [];

    if (project.img) mediaSources.push(project.img);
    if (Array.isArray(project.detailImages)) mediaSources.push(...project.detailImages);
    if (project.scrollVideoUrl) mediaSources.push(project.scrollVideoUrl);
    if (project.scrollVideoUrl2) mediaSources.push(project.scrollVideoUrl2);
    if (project.pdfUrl) mediaSources.push(project.pdfUrl);

    if (Array.isArray(project.extraContent)) {
      project.extraContent.forEach((item: any) => {
        if (item?.url && typeof item.url === 'string') mediaSources.push(item.url);
      });
    }

    const uniqueSources = Array.from(new Set(mediaSources.filter(Boolean)));

    const media: MediaAsset[] = uniqueSources.map((src, mediaIndex) => {
      const type = detectMediaType(src);
      return {
        id: `${project.id}-${mediaIndex}`,
        type,
        src,
        label: `${mediaTypeLabel[type]} ${mediaIndex + 1}`,
      };
    });

    return {
      id: Number(project.id ?? index + 1),
      title: project.title ?? `Project ${index + 1}`,
      subtitle: project.label ?? project.category ?? 'VISUAL PROJECT',
      year: project.year ?? '2026',
      description: project.desc ?? 'Project description pending update from portfolio PDF.',
      color: project.color ?? '#f97316',
      cover: project.img ?? 'https://picsum.photos/seed/fallback/1200/800',
      tools: Array.isArray(project.tools) ? project.tools : [],
      media: media.length > 0 ? media : [{ id: `${project.id}-cover`, type: 'image', src: project.img, label: 'COVER' }],
    };
  });
};

const VinylProjects: React.FC = () => {
  const projects = useMemo(() => normalizeProjects(), []);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);

  const activeProject = useMemo(
    () => projects.find((item) => item.id === activeProjectId) ?? null,
    [activeProjectId, projects]
  );

  const activeMedia = useMemo(() => {
    if (!activeProject) return null;
    return activeProject.media.find((item) => item.id === activeMediaId) ?? activeProject.media[0] ?? null;
  }, [activeMediaId, activeProject]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b0c11] py-24 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-[#ff7a18]/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-[#7bc5ff]/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-[#ffe66d]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-[min(1200px,92vw)]">
        <div className="mb-14 flex flex-col gap-5 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/55">Selected Works</p>
          <h2 className="font-albert-black text-4xl leading-none tracking-tight text-white md:text-6xl">
            Project Vault
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            点击任意项目进入全屏详情层。每个项目支持图片、PDF、视频与动态海报，便于你后续按作品集 PDF 继续替换真实素材。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, cardIndex) => {
            const typeSet = Array.from(new Set(project.media.map((item) => item.type)));
            return (
              <motion.button
                key={project.id}
                type="button"
                onClick={() => {
                  setActiveProjectId(project.id);
                  setActiveMediaId(project.media[0]?.id ?? null);
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.45, delay: cardIndex * 0.05 }}
                viewport={{ once: true, margin: '-80px' }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] text-left backdrop-blur"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/60">
                    <span>{project.subtitle}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-albert-black text-2xl tracking-tight text-white">{project.title}</h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-white/70">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {typeSet.map((type) => (
                      <span
                        key={`${project.id}-${type}`}
                        className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/75"
                      >
                        {mediaTypeLabel[type]}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-md"
          >
            <div className="mx-auto flex h-full w-[min(1320px,96vw)] flex-col gap-6 py-5 md:py-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">{activeProject.subtitle}</p>
                  <h3 className="mt-1 font-albert-black text-3xl tracking-tight text-white md:text-4xl">{activeProject.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveProjectId(null);
                    setActiveMediaId(null);
                  }}
                  className="rounded-full border border-white/25 px-4 py-2 text-sm uppercase tracking-[0.2em] text-white/85 transition hover:bg-white hover:text-black"
                >
                  Close
                </button>
              </div>

              <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[280px,1fr]">
                <aside className="overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-sm leading-relaxed text-white/75">{activeProject.description}</p>
                  {activeProject.tools.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeProject.tools.map((tool) => (
                        <span
                          key={`${activeProject.id}-${tool}`}
                          className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 space-y-2">
                    {activeProject.media.map((asset, idx) => {
                      const isCurrent = activeMedia.id === asset.id;
                      return (
                        <button
                          key={asset.id}
                          type="button"
                          onClick={() => setActiveMediaId(asset.id)}
                          className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                            isCurrent
                              ? 'border-white bg-white/15 text-white'
                              : 'border-white/15 bg-transparent text-white/70 hover:bg-white/8 hover:text-white'
                          }`}
                        >
                          <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">#{String(idx + 1).padStart(2, '0')}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em]">{asset.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-[#050608]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMedia.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="h-full w-full"
                    >
                      {(activeMedia.type === 'image' || activeMedia.type === 'poster') && (
                        <img src={activeMedia.src} alt={activeMedia.label} className="h-full w-full object-contain" />
                      )}

                      {activeMedia.type === 'video' && (
                        <video src={activeMedia.src} controls autoPlay muted loop className="h-full w-full object-contain" />
                      )}

                      {activeMedia.type === 'pdf' && (
                        <iframe
                          src={`${activeMedia.src}#toolbar=0`}
                          title={activeMedia.label}
                          className="h-full w-full"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VinylProjects;
