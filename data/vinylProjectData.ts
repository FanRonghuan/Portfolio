/// <reference types="vite/client" />

const CARD_POSITIONS = [
    { left: '35%',  top: '65%',  rotate: -15, zIndex: 1, scale: 0.8 },
    { left: '55%',  top: '56%',  rotate: 8,   zIndex: 2, scale: 0.81 },
    { left: '75%',  top: '62%',  rotate: -8,  zIndex: 3, scale: 0.78 },
    { left: '95%',  top: '59%',  rotate: 12,  zIndex: 4, scale: 0.808 },
    { left: '115%', top: '56%',  rotate: -5,  zIndex: 5, scale: 0.8 },
    { left: '135%', top: '63%',  rotate: 15,  zIndex: 6, scale: 0.83 },
    { left: '155%', top: '61%',  rotate: -10, zIndex: 7, scale: 0.77 },
    { left: '175%', top: '58%',  rotate: 6,   zIndex: 8, scale: 0.81 },
]; // 🔒 LOCKED DATA: USER CONFIGURATION
// Please do not overwrite this file with placeholder data in future updates.

export const ASSET_BASE = `${import.meta.env.BASE_URL}assets/`;

// 自定义长图链接 (Updated to generic placeholders)
export const MY_CUSTOM_LONG_IMAGE = 'https://picsum.photos/seed/long/1920/1080';

// 资源链接 (Updated to generic placeholders)
export const ASSETS = {
    P1_IMG_1: 'https://picsum.photos/seed/p1_1/1920/1080',
    P1_IMG_2: 'https://picsum.photos/seed/p1_2/1920/1080',
    P1_IMG_3: 'https://picsum.photos/seed/p1_3/1920/1080',
    P1_VID_1: "https://www.w3schools.com/html/mov_bbb.mp4",
    P1_VID_2: "https://www.w3schools.com/html/movie.mp4",
    PROJECT_2_LONG: 'https://picsum.photos/seed/p2_long/1920/1080',
    PROJECT_2_VIDEO: "https://www.w3schools.com/html/mov_bbb.mp4" 
};

export const VIDEO_AI_ITEMS = [
    // Reordered and mapped to specified files per user request
    {
        id: 'video-ai-2',
        title: '剧情片《我的春节，是一场天气预报》',
        subtitle: 'Narrative short',
        description: `作品介绍：本作品是 90 秒温情治愈系 AI 影像短片，以 8 岁北方留守男孩的儿童视角展开，用“天气预报”作为亲情线索，讲述除夕大雪中等待父亲归家的暖心故事。整体采用乡村怀旧风格，前冷后暖的色调形成强烈情感反差，从等待的清冷压抑，到团圆的温暖治愈，完整呈现“爱超越距离与风雪”的核心内核。
脚本包含分镜设计、运镜衔接、AI 绘画提示词、童声旁白与 BGM 规划，细节贴合生活化场景，情绪层层递进。通过老式电视、气象云图、除夕暴雪、车灯归程、父子相拥等画面，用极简叙事传递浓厚亲情，兼顾短片节奏感与影视化质感，适合短内容传播与情感向视觉作品展示。`,
        tags: ['叙事', '氛围', '剪辑'],
        videoUrl: `${ASSET_BASE}spring_festival.mp4`,
        posterUrl: `${ASSET_BASE}project6-4.jpg`,
        grid: { colSpan: 3, rowSpan: 1 }
    },
    {
        id: 'video-ai-1',
        title: 'K-pop MV《ChronoShift》',
        subtitle: 'K-pop MV',
        description: `作品介绍：本作品为以“时空穿梭”为核心概念，塑造一位穿梭于多元时空的未来女战士形象。整体视觉以银色、橘红为主色调，融合赛博朋克霓虹、荒漠、宇宙三大场景，通过强烈的色彩对比与未来感场景，营造自信、神秘、高能的视觉基调。
策划完整覆盖 Intro、Verse、Chorus、Bridge、Dance Break 全段落，精准匹配歌词节奏设计分镜、运镜与剪辑特效，包含 360° 环绕拍摄、子弹时间、Glitch 故障转场、能量粒子、时空残影等专业镜头语言，强化舞蹈张力与时空穿梭的视觉冲击。整套方案兼顾叙事逻辑、舞台表现力与影视化质感，完整呈现一支韩式流行 MV 的创意执行思路。`,
        tags: ['MV', '动线', '舞美'],
        videoUrl: `${ASSET_BASE}kpop_mv.mp4`,
        posterUrl: `${ASSET_BASE}project6-3.jpg`,
        grid: { colSpan: 2, rowSpan: 2 }
    },
    {
        id: 'video-ai-3',
        title: '动漫片《高校异世界》',
        subtitle: 'Anime short',
        description: '作品介绍：本作品是一部“青春奇幻风 AI 动漫短片”，以“普通人闯入异能世界”为核心设定，讲述转学生林泽来到充满超能力的异世界高中，在重力操控、光影幻术等奇幻能力的包围下，以普通人的果敢与善良，在一场意外事故中赢得同伴认可，开启热血青春旅程的故事。',
        tags: ['分镜', '镜头', '节奏'],
        videoUrl: `${ASSET_BASE}dongman1.mp4`,
        posterUrl: `${ASSET_BASE}project6-1.jpg`,
        grid: { colSpan: 3, rowSpan: 2 }
    },
    {
        id: 'video-ai-4',
        title: '动漫片《遗忘税》',
        subtitle: 'Concept short',
        description: `作品介绍：本作品是一部“近未来赛博风 AI 短漫短片”，以记忆交易为核心设定，构建了一个可将遗憾记忆明码标价的神秘空间「回响交易室」。故事围绕中年男子梁修展开，他为偿还巨债，被迫变卖关于亡妻的珍贵记忆，在执事零的引导下，重新体验封存的痛苦与甜蜜，最终换取财富却彻底遗忘挚爱，留下永恒遗憾。
脚本设计融合现代巴洛克美学与赛博朋克视觉，通过全息记忆球、机械眼镜、记忆晶体等意象，探讨记忆、爱与代价的深刻主题。方案包含角色设定、分镜运镜、台词设计与视觉风格规划，兼具叙事张力与影视化质感，完整呈现 AI 影像的创意执行思路。`,
        tags: ['概念', '叙事', '情绪'],
        videoUrl: `${ASSET_BASE}dongman2.mp4`,
        posterUrl: `${ASSET_BASE}project6-2.jpg`,
        grid: { colSpan: 2, rowSpan: 1 }
    }
];

export interface WaveItemConfig {
    url: string;
    x: number;
    y: number;
    width: number;
    rotate?: number;
    zIndex?: number;
    delay?: number;
}

// 自由布局配置 (Fox and Rabbit)
// 🔒 DATA LOCKED: User specified values
export const CUSTOM_FOX_RABBIT_CONFIG: WaveItemConfig[] = [
    {
        url: MY_CUSTOM_LONG_IMAGE,
        x: 375,
        y: 8710,
        width: 750,
        rotate: 0,
        zIndex: 30
    }
];

// 自由布局配置 (Wave Images)
// 🔒 DATA LOCKED: User specified values
export const WAVE_IMAGES_CONFIG: WaveItemConfig[] = [
    { url: 'https://picsum.photos/seed/wave1/750/300', x: -390, y: 9000, width: 750, rotate: 0, zIndex: 3, delay: 0.1 },
    { url: 'https://picsum.photos/seed/wave2/750/300', x: -390, y: 8840, width: 750, rotate: 0, zIndex: 2, delay: 0.2 },
    { url: 'https://picsum.photos/seed/wave3/750/300', x: -390, y: 8740, width: 750, rotate: 0, zIndex: 1, delay: 0.3 }
];

// Group 1 Cards Data
export const GROUP_1_CARDS_DATA = [
    { id: 1, xOffset: -400, yOffset: 8320, width: 188.52, height: 109.18, rotate: 0, borderRadius: '32px', img: `${ASSET_BASE}Project1-1.jpg` },
    { id: 2, xOffset: -201.5, yOffset: 8320, width: 188.52, height: 68.61, rotate: 0, borderRadius: '32px', img: `${ASSET_BASE}Project1-2.jpg` },
    { id: 3, xOffset: -3, yOffset: 8320, width: 188.52, height: 90.28, rotate: 0, borderRadius: '32px', img: `${ASSET_BASE}Project1-3.jpg` },
    { id: 4, xOffset: 195.52, yOffset: 8320, width: 188.52, height: 109.18, rotate: 0, borderRadius: '32px', img: `${ASSET_BASE}Project1-4.jpg` }
];

// New Scattered Images
export const CUSTOM_NEW_IMAGES = [
    { 
        id: 'd1', 
        img: `${ASSET_BASE}Project1-1.jpg`, 
        x: 350,      
        y: 9900,    
        w: 220.8,      
        h: 307.2,      
        r: -7.76      
    },
    { 
        id: 'd2', 
        img: `${ASSET_BASE}Project1-2.jpg`, 
        x: 515, 
        y: 10120, 
        w: 220.8, 
        h: 307.2, 
        r: 10.12 
    },
    { 
        id: 'd3', 
        img: `${ASSET_BASE}Project1-3.jpg`, 
        x: 635, 
        y:9750, 
        w: 220.8, 
        h: 307.2,  
        r: 2.15 
    },
    { 
        id: 'd4', 
        img: `${ASSET_BASE}Project1-5.jpg`, 
        x: 920, 
        y: 9980, 
        w: 220.8, 
        h: 307.2,  
        r: -5.54 
    }
];

// 🇨🇳 CHINA OPTIMIZATION: Replaced standard CDNs with jsDelivr mirror for speed
export const TOOL_ICONS: Record<string, string> = {
    'Figma': `${ASSET_BASE}figma-icon.jpg`,
    'PS': `${ASSET_BASE}ps-icon.jpg`,
    'AI': `${ASSET_BASE}ai-icon.jpg`,
    'AE': `${ASSET_BASE}ae-icon.jpg`,
    'Blender': `${ASSET_BASE}blender-icon.jpg`,
    'C4D': `${ASSET_BASE}c4d-icon.jpg`,
    'React': `${ASSET_BASE}React-icon.jpg`,
    'ThreeJS': `${ASSET_BASE}Three.js-icon.jpg`, 
    'Jimeng': `${ASSET_BASE}jimeng-icon.jpg`,
    'Pinterest': `${ASSET_BASE}pinterest-icon.jpg`,
    'Chartgpt': `${ASSET_BASE}chartgpt-icon.jpg`,
    'Gemini': `${ASSET_BASE}gemini-icon.jpg`,
    'Jianying': `${ASSET_BASE}jianying-icon.jpg`,
    'LibLib': `${ASSET_BASE}liblib-icon.jpg`   
};

// Project Data
export const PROJECTS_DATA = [
    { 
            id: 1, 
            title: '品牌设计', 
            label: 'BRAND DESIGN', 
            year: '2024.04', 
            client: 'CLIENT', 
            color: '#7BD7FF', 
            intensity: 5,
        img: 'assets/Project1-1.jpg', 
        previewBgImg: 'assets/Project1-1.jpg', 
            desc: '为品牌提供完整视觉识别、海报与活动物料设计，强化品牌记忆点。',
      tools: ['Jimeng', 'PS', 'AI', 'LibLib'],
      previewTextColor: {
        year: '#E6E6E6',
        label: '#E6E6E6',
        title: '#FFFFFF',
        description: '#D9D9D9',
        tools: '#E6E6E6',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery', 
      scrollVideoUrl: ASSETS.P1_VID_1,
      scrollVideoUrl2: ASSETS.P1_VID_2,
      sequenceConfig1: {
          baseUrl: 'https://picsum.photos/seed/seq/200/200', 
          suffix: '.png',
          digits: 3,       
          frameCount: 56,
          startIndex: 1
      },
            detailImages: [
                `${ASSET_BASE}Project1-1.jpg`,
                `${ASSET_BASE}Project1-2.jpg`,
                `${ASSET_BASE}Project1-3.jpg`,
                `${ASSET_BASE}Project1-4.jpg`,
                `${ASSET_BASE}Project1-5.jpg`,
                `${ASSET_BASE}Project1-6.jpg`,
                `${ASSET_BASE}Project1-7.jpg`,
                `${ASSET_BASE}Project1-8.jpg`,
                `${ASSET_BASE}Project1-9.jpg`,
                `${ASSET_BASE}Project1-10.jpg`,
                `${ASSET_BASE}Project1-11.jpg`,
                `${ASSET_BASE}Project1-12.jpg`,
                `${ASSET_BASE}Project1-13.jpg`,
                `${ASSET_BASE}Project1-14.jpg`
            ],
  },
  { 
      id: 2, 
      title: 'UI设计', 
      label: 'UI DESIGN', 
      year: '2026.03', 
      color: '#FFA500', 
      intensity: 4,
      img: `${ASSET_BASE}Project2-7-shoutu.jpg`, 
      previewBgImg: `${ASSET_BASE}Project2-7-shoutu.jpg`,
      desc: '基于对Z世代社交趋势的洞察，独立设计这款名为“SNAP闪迹”的社交 APP。',
      tools: ['Figma', 'Jimeng', 'PS', 'Chartgpt'],
      previewTextColor: {
        year: '#404040',
        label: '#404040',
        title: '#000000',
        description: '#404040',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery',
      scrollVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      project2Config: {
        phoneImage: {
            url: 'https://picsum.photos/seed/phone/300/600',
            x: 607, 
            y: 660, 
            width: 280
        },
        cards: [
            { id: 1, url: 'https://picsum.photos/seed/p2c1/400/300', y: 0 },
            { id: 2, url: 'https://picsum.photos/seed/p2c2/400/300', y: -348 },
            { id: 3, url: 'https://picsum.photos/seed/p2c3/400/300', y: -620 },
            { id: 4, url: 'https://picsum.photos/seed/p2c4/400/300', y: -1080 },
            { id: 5, url: 'https://picsum.photos/seed/p2c5/400/300', y: -1800 },
            { id: 6, url: 'https://picsum.photos/seed/p2c6/400/300', y: -2580 },
            { id: 7, url: 'https://picsum.photos/seed/p2c7/400/300', y: -3430 },
            { id: 8, url: 'https://picsum.photos/seed/p2c8/400/300', y: -3770 },
        ],
        extraContent: [
            { 
                type: 'image', 
                y: 445, 
                url: 'https://picsum.photos/seed/extra1/200/200',
                width: 245, 
                zIndex: 25,
                x: 380,      
                rotate: 12 
            },
            { 
                type: 'image', 
                y: 400, 
                url: 'https://picsum.photos/seed/extra2/200/200',
                width: 125,
                zIndex: 26,
                x: 80,      
                rotate: -2 
            }
        ],
        videoInteraction: {
            y: 400, 
            videoUrl: 'https://www.w3schools.com/html/movie.mp4'
        }
      },
      detailImages: [
          `${ASSET_BASE}Project2-1.png`,
          `${ASSET_BASE}Project2-2.jpg`,
          `${ASSET_BASE}Project2-3.jpg`,
          `${ASSET_BASE}Project2-4.jpg`,
          `${ASSET_BASE}Project2-5.jpg`,
          `${ASSET_BASE}Project2-6.jpg`
      ], 
  },
  { 
      id: 3, title: '品牌活动设计', label: 'VISUAL DESIGN', year: '2025.12', color: '#4DA6FF', 
      shadowColor: '#4DA6FF',
      intensity: 3,
      img: `${ASSET_BASE}Project3-1.jpg`, 
      previewBgImg: `${ASSET_BASE}Project3-1.jpg`,
      desc: '结合“公园20分钟效应”，主打情绪价值的线下轻户外社区生活节全案设计。',
      tools: ['PS', 'Pinterest', 'Figma', 'Jimeng','Gemini'],
      previewTextColor: {
        year: '#404040',
        label: '#404040',
        title: '#000000',
        description: '#404040',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery',
      detailImages: [
          `${ASSET_BASE}Project3-1.jpg`,
          `${ASSET_BASE}Project3-2.jpg`,
          `${ASSET_BASE}Project3-3.jpg`,
          `${ASSET_BASE}Project3-4.jpg`,
          `${ASSET_BASE}Project3-5.jpg`,
          `${ASSET_BASE}Project3-6.jpg`,
          `${ASSET_BASE}Project3-7.jpg`,
          `${ASSET_BASE}Project3-8.jpg`,
          `${ASSET_BASE}Project3-9.jpg`,
          `${ASSET_BASE}Project3-10.jpg`,
          `${ASSET_BASE}Project3-11.jpg`,
          `${ASSET_BASE}Project3-12.jpg`,
          `${ASSET_BASE}Project3-13.jpg`
      ],
      detailText: { main: 'Project', sub: 'VISUAL DESIGN', signature: 'Design' }
  },
  { 
      id: 4, 
      title: 'AIGC运营活动设计', 
      label: 'OPERATIONAL ACTIVITY DESIGN', 
      year: '2025.06', 
      color: '#EA2F2F', 
      intensity: 5,
      img: `${ASSET_BASE}Project4-1.jpg`, 
      previewBgImg: `${ASSET_BASE}Project4-1.jpg`,
      desc: '美学与 AI 工具结合的商业设计实践，支持运营活动的视觉与物料效率提升。',
      tools: ['Figma', 'LibLib', 'PS', 'Pinterest'],
      previewTextColor: {
        year: '#404040',
        label: '#404040',
        title: '#000000',
        description: '#404040',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery',
      detailImages: [
          `${ASSET_BASE}Project4-1.jpg`,
          `${ASSET_BASE}Project4-2.jpg`,
          `${ASSET_BASE}Project4-3.jpg`,
          `${ASSET_BASE}Project4-4.jpg`,
          `${ASSET_BASE}Project4-5.jpg`,
          `${ASSET_BASE}Project4-6.jpg`,
          `${ASSET_BASE}Project4-7.jpg`,
          `${ASSET_BASE}Project4-8.jpg`,
          `${ASSET_BASE}Project4-9.jpg`,
          `${ASSET_BASE}Project4-10.jpg`,
          `${ASSET_BASE}Project4-11.jpg`
      ],
      extraContent: []
  },
  { 
      id: 5, 
      title: '海报设计', 
      label: 'POSTER DESIGN', 
      year: '2024-2026', 
      color: '#E0221E', 
      intensity: 4,
      img: `${ASSET_BASE}Project5-1.jpg`, 
      previewBgImg: `${ASSET_BASE}Project5-1.jpg`,
      desc: '全屏海报与视觉海报系列设计集，侧重视觉张力与信息传达。',
      tools: ['AI', 'Figma', 'PS', 'LibLib','Gemini'],
      previewTextColor: {
        year: '#E6E6E6',
        label: '#E6E6E6',
        title: '#FFFFFF',
        description: '#E6E6E6',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'gallery',
      detailImages: [
          `${ASSET_BASE}Project5-1.jpg`,
          `${ASSET_BASE}Project5-2.jpg`,
          `${ASSET_BASE}Project5-3.jpg`,
          `${ASSET_BASE}Project5-4.jpg`,
          `${ASSET_BASE}Project5-5.jpg`,
          `${ASSET_BASE}Project5-6.jpg`,
          `${ASSET_BASE}Project5-7.jpg`,
          `${ASSET_BASE}Project5-8.jpg`,
          `${ASSET_BASE}Project5-9.jpg`,
          `${ASSET_BASE}Project5-10.jpg`,
          `${ASSET_BASE}Project5-11.jpg`
      ]
  },
  {
      id: 6,
      title: '2025-2026 AI VIDEO 视频',
      label: 'AI VIDEO',
      year: '2025-2026',
      color: '#AA88EE',
      intensity: 4,
      img: `${ASSET_BASE}project6-1.jpg`,
      previewBgImg: `${ASSET_BASE}project6-1.jpg`,
      desc: 'AI 视频方向探索：节奏、叙事与视觉风格统一。',
      tools: ['Jimeng', 'Jianying', 'Gemini','Chartgpt'],
      layout: 'video-ai',
      videoAiItems: VIDEO_AI_ITEMS,
      horizontalData: VIDEO_AI_ITEMS.map((item) => ({
          id: item.id,
          title: item.title,
          img: item.posterUrl,
          video: item.videoUrl,
          width: 320,
          height: 560,
          flippedWidth: 960,
          flippedHeight: 540
      }))
  }
];
