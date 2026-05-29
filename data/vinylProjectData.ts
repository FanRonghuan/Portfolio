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

// Project Data (only projects 1-5 retained per user request)
export const PROJECTS_DATA = [
    { 
            id: 1, 
            title: '品牌设计', 
            label: 'BRAND DESIGN', 
            year: '2024.04', 
            client: 'CLIENT', 
            color: '#FF7F27', 
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
      extraContent: [
          {
              type: 'video',
              url: 'https://www.w3schools.com/html/mov_bbb.mp4',
              y: 16600, 
              width: 800, 
              scale: 1,
              x: 0 
          }
      ]
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
  }
];
