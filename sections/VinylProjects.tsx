import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS_DATA } from '../data/vinylProjectData';

interface CuratedProject {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  summary: string;
  details: string;
  role: string;
  focus: string;
  output: string;
  color: string;
  cover: string;
  previewSources: string[];
  gravity: {
    left: string;
    top: string;
    rotate: number;
    scale: number;
    width: string;
    zIndex: number;
  };
}

const CURATED_PROJECTS: CuratedProject[] = [
  {
    id: 'brand-design',
    title: '品牌设计',
    subtitle: 'Brand Identity',
    year: '2025',
    summary: '品牌设计项目一的完整视觉方案，按作品集顺序连续展示全部页面。',
    details: '这个项目按照品牌从概念到落地的叙事方式展开，包含主视觉、延展规范、应用场景与完整排版页。右侧会直接按顺序向下排列 14 张图片，形成接近真实翻页阅读的浏览体验，不会出现 PDF 下载弹窗。',
    role: '视觉设计 / 排版整合 / 品牌延展',
    focus: '品牌识别、主视觉、落地应用、完整长页叙事',
    output: '14 页连续长图展示',
    color: '#f3c623',
    cover: '/assets/Project1-1.jpg',
    previewSources: Array.from({ length: 14 }, (_, index) => `/assets/Project1-${index + 1}.jpg`),
    gravity: { left: '3%', top: '7%', rotate: -7, scale: 0.98, width: '28%', zIndex: 3 },
  },
  {
    id: 'ui-design',
    title: 'UI设计项目',
    subtitle: 'UI / UX',
    year: '2025',
    summary: '围绕界面结构、组件状态和动效规范展开的界面设计案例。',
    details: '这个项目更偏向界面信息组织和视觉层级控制，重点放在页面结构、组件状态、可用性和统一的界面节奏上。右侧内容按你上传的资源从 Project2-1 开始依次展开，完整呈现 UI 方案的过程和结果。',
    role: 'UI 设计 / 信息架构 / 界面视觉',
    focus: '布局层级、组件状态、交互节奏',
    output: '6 页连续长图展示',
    color: '#7bc5ff',
    cover: '/assets/Project2-1.png',
    previewSources: ['/assets/Project2-1.png', '/assets/Project2-2.jpg', '/assets/Project2-3.jpg', '/assets/Project2-4.jpg', '/assets/Project2-5.jpg', '/assets/Project2-6.jpg'],
    gravity: { left: '34%', top: '0%', rotate: 6, scale: 1.02, width: '31%', zIndex: 5 },
  },
  {
    id: 'brand-campaign',
    title: '品牌活动全案',
    subtitle: 'Campaign System',
    year: '2024',
    summary: '活动主题、传播视觉、KV延展和多场景落地的整套方案。',
    details: '这个项目围绕品牌活动的完整传播链路展开，包含主题设定、主视觉、延展物料、现场氛围和多场景应用。右侧按你的 Project3 资源顺序向下排列，形成像作品集 PDF 一样的连续阅读体验。',
    role: '品牌活动视觉 / KV 设计 / 延展物料',
    focus: '传播主题、主KV、现场与物料统一',
    output: '13 页连续长图展示',
    color: '#ff6b6b',
    cover: '/assets/Project3-1.jpg',
    previewSources: ['/assets/Project3-1.jpg', '/assets/Project3-2.jpg', '/assets/Project3-3.jpg', '/assets/Project3-4.jpg', '/assets/Project3-5.jpg', '/assets/Project3-6.jpg', '/assets/Project3-7.jpg', '/assets/Project3-8.jpg', '/assets/Project3-9.jpg', '/assets/Project3-10.jpg', '/assets/Project3-11.jpg', '/assets/Project3-12.jpg', '/assets/Project3-13.jpg'],
    gravity: { left: '66%', top: '6%', rotate: -4, scale: 0.97, width: '28%', zIndex: 4 },
  },
  {
    id: 'operation-design',
    title: '运营活动设计',
    subtitle: 'Operation Design',
    year: '2024',
    summary: '围绕增长节点、线上运营及节日活动的高频输出设计。',
    details: '这个项目更偏增长和运营节奏，强调节点活动的快速产出、节日营销的统一风格，以及适配线上传播的内容效率。右侧按 Project4 资源完整展开，方便连续查看所有页面。',
    role: '运营视觉 / 节日活动 / 增长物料',
    focus: '高频更新、传播效率、活动转化',
    output: '11 页连续长图展示',
    color: '#8fdf6c',
    cover: '/assets/Project4-1.jpg',
    previewSources: ['/assets/Project4-1.jpg', '/assets/Project4-2.jpg', '/assets/Project4-3.jpg', '/assets/Project4-4.jpg', '/assets/Project4-5.jpg', '/assets/Project4-6.jpg', '/assets/Project4-7.jpg', '/assets/Project4-8.jpg', '/assets/Project4-9.jpg', '/assets/Project4-10.jpg', '/assets/Project4-11.jpg'],
    gravity: { left: '12%', top: '48%', rotate: -11, scale: 1, width: '30%', zIndex: 2 },
  },
  {
    id: 'poster-design',
    title: '海报设计',
    subtitle: 'Poster System',
    year: '2023-2025',
    summary: '更适合竖版长图叙事的海报作品，直接以长图形式呈现。',
    details: '这个项目用于展示系列海报和单张海报的视觉表达，适合通过连续长图维持阅读节奏，同时突出主视觉、版式和风格变化。右侧按 Project5 的顺序完整展开。',
    role: '海报设计 / 系列视觉 / 版式延展',
    focus: '主视觉、系列统一、风格变化',
    output: '10 页连续长图展示',
    color: '#d48cff',
    cover: '/assets/Project5-1.jpg',
    previewSources: ['/assets/Project5-1.jpg', '/assets/Project5-2.jpg', '/assets/Project5-3.jpg', '/assets/Project5-4.jpg', '/assets/Project5-5.jpg', '/assets/Project5-6.jpg', '/assets/Project5-7.jpg', '/assets/Project5-8.jpg', '/assets/Project5-9.jpg', '/assets/Project5-10.jpg'],
    gravity: { left: '52%', top: '48%', rotate: 8, scale: 1.04, width: '32%', zIndex: 6 },
  },
];

const LongImagePreview: React.FC<{ sources: string[]; alt: string }> = ({ sources, alt }) => {
  const [sourceIndex, setSourceIndex] = useState(0);
  const currentSource = sources[Math.min(sourceIndex, sources.length - 1)] ?? sources[0] ?? '';

  if (sources.length > 1) {
    return (
      <div className="flex w-full flex-col gap-6 pb-4">
        {sources.map((source, index) => (
          <div
            key={`${alt}-${index}`}
            className="overflow-hidden rounded-[20px] border border-white/8 bg-[#111317] shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
          >
            <img
              src={source}
              alt={`${alt} ${index + 1}`}
              loading={index < 2 ? 'eager' : 'lazy'}
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <img
      src={currentSource}
      alt={alt}
      onError={() => setSourceIndex((index) => Math.min(index + 1, sources.length - 1))}
      className="h-auto w-full max-w-none rounded-[20px] object-contain"
    />
  );
};

const PosterSequencePreview: React.FC<{ sources: string[]; title: string }> = ({ sources, title }) => {
  return (
    <div className="w-full max-w-[920px] pb-10">
      <div className="sticky top-0 z-10 mb-8 flex items-center justify-between rounded-full border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-md">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">Poster Reading Mode</p>
          <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/80">{title}</p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/55">
          {sources.length} Pages
        </div>
      </div>

      <div className="flex flex-col gap-8 snap-y snap-mandatory">
        {sources.map((source, index) => {
          const isOdd = index % 2 === 0;
          return (
            <section
              key={`${title}-poster-${index}`}
              className={`snap-start flex min-h-[78vh] items-center ${isOdd ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`relative w-full max-w-[780px] ${isOdd ? 'pl-2 md:pl-4' : 'pr-2 md:pr-4'}`}>
                <div className="absolute -top-3 left-6 z-10 rounded-full border border-white/12 bg-black/80 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/65 shadow-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className={`overflow-hidden rounded-[24px] border border-white/10 bg-[#111317] shadow-[0_22px_90px_rgba(0,0,0,0.45)] ${isOdd ? 'rotate-[-1deg]' : 'rotate-[1deg]'}`}>
                  <img
                    src={source}
                    alt={`${title} ${index + 1}`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between px-2 text-[10px] uppercase tracking-[0.24em] text-white/40">
                  <span>Page {String(index + 1).padStart(2, '0')}</span>
                  <span>{index % 2 === 0 ? 'Full-bleed view' : 'Poster spread'}</span>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

const VinylProjects: React.FC = () => {
  const projects = useMemo(() => CURATED_PROJECTS, []);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject = useMemo(
    () => projects.find((item) => item.id === activeProjectId) ?? null,
    [activeProjectId, projects]
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b0c11] py-24 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-6%] h-[30rem] w-[30rem] rounded-full bg-[#f3c623]/12 blur-3xl" />
        <div className="absolute right-[-10%] top-[18%] h-[26rem] w-[26rem] rounded-full bg-[#7bc5ff]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-1/2 h-[20rem] w-[40rem] -translate-x-1/2 rounded-full bg-[#ff6b6b]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_48%)]" />
      </div>

      <div className="relative mx-auto w-[min(1320px,94vw)]">
        <div className="mb-10 flex flex-col gap-4 md:mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.38em] text-white/50">Selected Works</p>
          <h2 className="font-albert-black text-4xl leading-none tracking-tight text-white md:text-6xl">
            Project Vault
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-white/68 md:text-base">
            现在主卡片保持更松散的重力感陈列，详情页只保留左侧阐述、右侧长图的连续浏览，不再做多媒体切换或下载。
          </p>
        </div>

        <div className="relative min-h-[760px] md:min-h-[860px]">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => setActiveProjectId(project.id)}
              initial={{ opacity: 0, y: 36, rotate: project.gravity.rotate * 1.3 }}
              whileInView={{ opacity: 1, y: 0, rotate: project.gravity.rotate }}
              whileHover={{ y: -10, rotate: project.gravity.rotate + (index % 2 === 0 ? -2 : 2), scale: project.gravity.scale + 0.03 }}
              transition={{ duration: 0.55, delay: index * 0.07, type: 'spring', stiffness: 90, damping: 16 }}
              viewport={{ once: true, margin: '-120px' }}
              className="group absolute overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] text-left shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-md"
              style={{
                left: project.gravity.left,
                top: project.gravity.top,
                width: project.gravity.width,
                zIndex: project.gravity.zIndex,
                transformOrigin: 'center center',
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={project.cover}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/18 bg-black/28 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur-md">
                  {project.subtitle}
                </div>
                <div className="absolute right-4 top-4 rounded-full border border-white/18 bg-black/28 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/70 backdrop-blur-md">
                  {project.year}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-2xl font-black leading-none tracking-tight text-white md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-[88%] text-sm leading-relaxed text-white/78">
                    {project.summary}
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] overflow-y-auto bg-black/88 backdrop-blur-md"
          >
            <div className="mx-auto flex min-h-full w-[min(1380px,96vw)] flex-col gap-5 py-5 md:py-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">{activeProject.subtitle}</p>
                  <h3 className="mt-1 font-albert-black text-3xl tracking-tight text-white md:text-5xl">{activeProject.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProjectId(null)}
                  className="shrink-0 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.2em] text-white/85 transition hover:bg-white hover:text-black"
                >
                  Close
                </button>
              </div>

              <div className="grid min-h-0 flex-1 gap-5 lg:grid-cols-[340px,1fr]">
                <aside className="flex min-h-0 flex-col rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex-1 overflow-y-auto pr-1">
                    <div className="mb-4 inline-flex rounded-full border border-white/12 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/55">
                      {activeProject.output}
                    </div>
                    <p className="text-sm leading-7 text-white/76 md:text-base md:leading-8">
                      {activeProject.details}
                    </p>
                    <p className="mt-5 text-sm leading-7 text-white/58">
                      这里可以继续补充品牌定位、视觉关键词、设计思路、落地输出和结果总结。左侧保持克制，右侧用完整长图承载主要内容。
                    </p>

                    <div className="mt-6 rounded-[24px] border border-white/10 bg-black/18 p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">Project Info</p>
                      <div className="mt-4 space-y-3 text-sm leading-6 text-white/70">
                        <p><span className="text-white/45">Role</span> · {activeProject.role}</p>
                        <p><span className="text-white/45">Focus</span> · {activeProject.focus}</p>
                        <p><span className="text-white/45">Pages</span> · {activeProject.previewSources.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[activeProject.subtitle, activeProject.year, 'Long-scroll'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/72"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </aside>

                <div className="min-h-0 overflow-hidden rounded-[28px] border border-white/10 bg-[#050608]">
                  <div className="flex h-full min-h-[calc(100vh-190px)] items-start justify-center overflow-y-auto p-3 md:p-4 scroll-smooth">
                    {activeProject.id === 'poster-design' ? (
                      <PosterSequencePreview sources={activeProject.previewSources} title={activeProject.title} />
                    ) : (
                      <LongImagePreview sources={activeProject.previewSources} alt={activeProject.title} />
                    )}
                  </div>
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
