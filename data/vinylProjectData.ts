








// 🔒 LOCKED DATA: USER CONFIGURATION
// Please do not overwrite this file with placeholder data in future updates.

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
    { id: 1, xOffset: -400, yOffset: 8320, width: 188.52, height: 109.18, rotate: 0, borderRadius: '32px', img: 'https://picsum.photos/seed/card1/400/300' },
    { id: 2, xOffset: -201.5, yOffset: 8320, width: 188.52, height: 68.61, rotate: 0, borderRadius: '32px', img: 'https://picsum.photos/seed/card2/400/300' },
    { id: 3, xOffset: -3, yOffset: 8320, width: 188.52, height: 90.28, rotate: 0, borderRadius: '32px', img: 'https://picsum.photos/seed/card3/400/300' },
    { id: 4, xOffset: 195.52, yOffset: 8320, width: 188.52, height: 109.18, rotate: 0, borderRadius: '32px', img: 'https://picsum.photos/seed/card4/400/300' }
];

// New Scattered Images
export const CUSTOM_NEW_IMAGES = [
    { 
        id: 'd1', 
        img: 'https://picsum.photos/seed/d1/400/600', 
        x: 350,      
        y: 9900,    
        w: 220.8,      
        h: 307.2,      
        r: -7.76      
    },
    { 
        id: 'd2', 
        img: 'https://picsum.photos/seed/d2/400/600', 
        x: 515, 
        y: 10120, 
        w: 220.8, 
        h: 307.2, 
        r: 10.12 
    },
    { 
        id: 'd3', 
        img: 'https://picsum.photos/seed/d3/400/600', 
        x: 635, 
        y:9750, 
        w: 220.8, 
        h: 307.2,  
        r: 2.15 
    },
    { 
        id: 'd4', 
        img: 'https://picsum.photos/seed/d4/400/600', 
        x: 920, 
        y: 9980, 
        w: 220.8, 
        h: 307.2,  
        r: -5.54 
    }
];

// 🇨🇳 CHINA OPTIMIZATION: Replaced standard CDNs with jsDelivr mirror for speed
export const TOOL_ICONS: Record<string, string> = {
    'Figma': 'https://jsd.cdn.zzko.cn/gh/devicons/devicon/icons/figma/figma-original.svg',
    'PS': 'https://jsd.cdn.zzko.cn/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    'AI': 'https://jsd.cdn.zzko.cn/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
    'AE': 'https://jsd.cdn.zzko.cn/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg',
    'Blender': 'https://jsd.cdn.zzko.cn/gh/devicons/devicon/icons/blender/blender-original.svg',
    'C4D': 'https://jsd.cdn.zzko.cn/gh/jayneysil520-dev/jayneysil@main/1197px-C4D_Logo.png',
    'React': 'https://jsd.cdn.zzko.cn/gh/devicons/devicon/icons/react/react-original.svg',
    'ThreeJS': 'https://jsd.cdn.zzko.cn/gh/devicons/devicon/icons/threejs/threejs-original.svg', 
    'Jimeng': 'https://jsd.cdn.zzko.cn/gh/jayneysil520-dev/jayneysil@main/%E5%8D%B3%E6%A2%A6icon.png',
    'Pinterest': 'https://jsd.cdn.zzko.cn/gh/devicons/devicon/icons/pinterest/pinterest-original.svg',
    'LibLib': 'https://jsd.cdn.zzko.cn/gh/jayneysil520-dev/jayneysil@main/liblib.png'
};

// Project Data
export const PROJECTS_DATA = [
  { 
      id: 1, 
      title: 'Default Project Title 1', 
      label: 'IP IMAGE DESIGN', 
      year: '2025.04', 
      client: 'CLIENT', 
      color: '#FF7F27', 
      intensity: 5,
      img: 'https://picsum.photos/seed/p1/800/600', 
      previewBgImg: 'https://picsum.photos/seed/p1bg/800/600', 
      desc: 'This is a default description for the first project. It showcases the layout and interaction.',
      tools: ['Jimeng', 'PS', 'Figma', 'Blender', 'LibLib'],
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
      detailImages: [ASSETS.P1_IMG_1, ASSETS.P1_IMG_2, ASSETS.P1_IMG_3],
  },
  { 
      id: 2, 
      title: 'Default Project Title 2', 
      label: 'VISUAL DESIGN', 
      year: '2025.02', 
      color: '#FFA500', 
      intensity: 4,
      img: 'https://picsum.photos/seed/p2/800/600', 
      desc: 'This is a default description for the second project.',
      tools: ['Figma', 'Jimeng', 'PS', 'Blender', 'LibLib'],
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
      detailImages: [], 
  },
  { 
      id: 3, title: 'Default Project Title 3', label: 'VISUAL DESIGN', year: '2022', color: '#4DA6FF', 
      shadowColor: '#4DA6FF',
      intensity: 3,
      img: 'https://picsum.photos/seed/p3/800/600', 
      desc: 'Default description for project 3.',
      tools: ['PS', 'AI', 'C4D'],
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
      detailImages: ['https://picsum.photos/seed/p3detail/1200/800'],
      detailText: { main: 'Project', sub: 'VISUAL DESIGN', signature: 'Design' }
  },
  { 
      id: 4, 
      title: 'Default Project Title 4', 
      label: 'LOGO / IP DESIGN', 
      year: '2022', 
      color: '#EA2F2F', 
      intensity: 5,
      img: 'https://picsum.photos/seed/p4/800/600', 
      desc: 'Default description for project 4.',
      tools: ['Figma', 'LibLib', 'PS', 'AI'],
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
          'https://picsum.photos/seed/p4d1/1200/800',
          'https://picsum.photos/seed/p4d2/1200/800'
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
      title: 'Default Project Title 5', 
      label: 'IOT INTERFACE', 
      year: '2025', 
      color: '#E0221E', 
      intensity: 4,
      img: 'https://picsum.photos/seed/p5/800/600', 
      desc: 'Default description for project 5.',
      tools: ['AI', 'Figma'],
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
          'https://picsum.photos/seed/p5d1/1200/800'
      ]
  },
  { 
      id: 6, 
      title: 'Default Project Title 6', 
      label: 'MOTION ART', 
      year: '2021-2025', 
      color: '#AA88EE', 
      intensity: 5,
      img: 'https://picsum.photos/seed/p6/800/600', 
      desc: 'Default description for project 6.',
      tools: ['C4D', 'AE', 'Blender'],
      previewTextColor: {
        year: '#000000',
        label: '#999999',
        title: '#000000',
        description: '#444444',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'horizontal-scroll',
      horizontalData: [
          {
              id: 1,
              img: 'https://picsum.photos/seed/p6c1/320/569', 
              video: 'https://www.w3schools.com/html/mov_bbb.mp4',
              title: 'Motion 1',
              width: 320, 
              height: 569, 
              flippedWidth: 484, 
              flippedHeight: 682.4, 
              y: 0, 
              scale: 1,
              introConfig: {
                  text: '01\nMOTION 1\n\nDefault description.',
                  x: -210, 
                  y: 100, 
                  rotate: 0,
                  fontSize: '14px',
                  width: '200px',
                  align: 'right'
              }
          },
          {
              id: 2,
              img: 'https://picsum.photos/seed/p6c2/320/569', 
              video: 'https://www.w3schools.com/html/movie.mp4',
              title: 'Motion 2',
              width: 320,
              height: 569,
              flippedWidth: 800, 
              flippedHeight: 450,
              y: 120, 
              scale: 1,
              introConfig: {
                  text: '02\nMOTION 2\n\nDefault description.',
                  x: -200, 
                  y: 200,
                  rotate: -5,
                  fontSize: '16px',
                  width: '180px',
                  align: 'right'
              }
          },
          {
              id: 3,
              img: 'https://picsum.photos/seed/p6c3/320/569', 
              video: 'https://www.w3schools.com/html/mov_bbb.mp4',
              title: 'Motion 3',
              width: 320,
              height: 569,
              flippedWidth: 800, 
              flippedHeight: 450,
              y: -80, 
              scale: 1,
              introConfig: {
                  text: '03\nMOTION 3\n\nDefault description.',
                  x: -190, 
                  y: 150,
                  rotate: 0,
                  fontSize: '14px',
                  width: '180px',
                  align: 'right'
              }
          },
          {
              id: 4,
              img: 'https://picsum.photos/seed/p6c4/320/569', 
              video: 'https://www.w3schools.com/html/movie.mp4',
              title: 'Motion 4',
              width: 320,
              height: 569,
              flippedWidth: 800, 
              flippedHeight: 450,
              y: 40, 
              scale: 1,
              introConfig: {
                  text: '04\nMOTION 4\n\nDefault description.',
                  x: -180, 
                  y: 300,
                  rotate: 5,
                  fontSize: '12px',
                  width: '150px',
                  align: 'right'
              }
          }
      ]
  },
  { 
      id: 7, 
      title: 'Default Project Title 7', 
      label: 'Personal Gallery', 
      year: '2021-2025', 
      color: '#4ECDC4', 
      intensity: 3,
      img: 'https://picsum.photos/seed/p7/800/600', 
      desc: 'Default description for project 7.', 
      tools: ['Blender', 'PS', 'AI'], 
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
          'https://picsum.photos/seed/p7d1/800/600',
          'https://picsum.photos/seed/p7d2/800/600',
          'https://picsum.photos/seed/p7d3/800/600'
      ]
  },
  { 
      id: 8, title: 'Default Project Title 8', label: 'Personal Growth', year: '2021-2026', color: '#7BC5FF', 
      intensity: 4,
      img: 'https://raw.githubusercontent.com/Rachel-ahua/picture-storage/refs/heads/main/project5.jpg', 
      desc: 'Default description for project 8.',
      tools: ['Figma', 'PS'], 
      previewTextColor: {
        year: '#000000',
        label: '#999999',
        title: '#000000',
        description: '#444444',
        tools: '#000000',
        arrow: '#000000',
        cardBorder: 'rgba(0,0,0,0.1)'
      },
      layout: 'pdf',
      pdfUrl: 'https://raw.githubusercontent.com/Rachel-ahua/picture-storage/main/shengdan_pdf.pdf',
      detailImages: [
          'https://picsum.photos/seed/p8d1/1200/800',
      ]
  }
];
