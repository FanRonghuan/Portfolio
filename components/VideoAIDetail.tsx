import React, { useRef, useState } from 'react';

type VideoAIItem = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    videoUrl: string;
    posterUrl: string;
    grid?: { colSpan?: number; rowSpan?: number };
};

type VideoAIDetailProps = {
    items: VideoAIItem[];
};

const VideoAIDetail: React.FC<VideoAIDetailProps> = ({ items }) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
    const [activeId, setActiveId] = useState<string | null>(null);
    const [endedMap, setEndedMap] = useState<Record<string, boolean>>({});

    const registerCard = (index: number) => (node: HTMLDivElement | null) => {
        if (node) cardRefs.current[index] = node;
    };

    const handleCardClick = (item: VideoAIItem) => {
        const nextActive = activeId === item.id ? null : item.id;
        setActiveId(nextActive);
        // if starting playback, clear ended flag for this item
        if (nextActive) setEndedMap(prev => ({ ...prev, [item.id]: false }));

        Object.entries(videoRefs.current).forEach(([key, video]) => {
            if (!video) return;
            if (key !== item.id) {
                video.pause();
                video.currentTime = 0;
            }
        });

        const target = videoRefs.current[item.id];
        if (!target) return;

        if (nextActive) {
            target.currentTime = 0;
            target.play().catch(() => undefined);
        } else {
            target.pause();
            target.currentTime = 0;
        }
    };

    return (
        <div ref={scrollerRef} className="w-full h-full overflow-y-auto bg-[#06060a] text-white">
            <div className="relative px-6 md:px-12 pt-10 pb-28">
                <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_20%_10%,rgba(170,136,238,0.25),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,122,0,0.2),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.06),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:110px_110px]" />

                <div className="relative max-w-6xl mx-auto mb-10">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/55">
                        <span className="inline-block w-8 h-[1px] bg-white/50" />
                        视觉节奏实验室
                    </div>
                    <h2 className="mt-4 text-3xl md:text-5xl font-albert-black tracking-tight">
                        VIDEO AI 二级页
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-white/70 max-w-2xl">
                        滚动驱动布局变化，点击卡片即可播放对应视频与查看设计讲解。
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto space-y-10">
                    {items.map((item, index) => {
                        const isActive = activeId === item.id;

                        return (
                            <div
                                key={item.id}
                                className="rounded-[28px] border border-white/10 bg-[#0d0d14] shadow-[0_30px_70px_-45px_rgba(0,0,0,0.9)] overflow-hidden"
                            >
                                <div className="px-6 md:px-10 py-6 md:py-8">
                                    <div className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                                        {item.subtitle}
                                    </div>
                                    <h3 className="mt-3 text-xl md:text-2xl font-albert-black tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm md:text-base text-white/75 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={`${item.id}-${tag}`}
                                                className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/10 border border-white/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    className="relative aspect-video bg-black/70"
                                    onClick={() => handleCardClick(item)}
                                >
                                    <video
                                        ref={(node) => {
                                            videoRefs.current[item.id] = node;
                                        }}
                                        src={item.videoUrl}
                                        poster={item.posterUrl}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        playsInline
                                        preload="metadata"
                                        controls={isActive}
                                        onEnded={() => {
                                            setActiveId(null);
                                            setEndedMap(prev => ({ ...prev, [item.id]: true }));
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                                    {/* Center replay button: only visible after video ended */}
                                    {endedMap[item.id] && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                                            <button
                                                type="button"
                                                className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/40 bg-black/30 transition-all"
                                                onClick={(e) => { e.stopPropagation(); handleCardClick(item); }}
                                            >
                                                <span className="sr-only">重新播放视频</span>
                                                <svg className="mx-auto" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polygon points="6 4 20 12 6 20" fill="currentColor" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.3em] text-white/70 pointer-events-none">
                                        <span className={`px-3 py-1 rounded-full border ${isActive ? 'border-white/70 text-white' : 'border-white/30 text-white/70'}`}>
                                            {isActive ? '播放中' : (endedMap[item.id] ? '播放结束' : '点击播放')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VideoAIDetail;
