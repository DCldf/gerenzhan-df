import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AccordionGallery from './AccordionGallery'
import BorderGlow from './BorderGlow'
import Masonry from './Masonry'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const videoSource = '/hero-background.mp4'

const experience = [
  {
    period: '2025.02 — 2026.07',
    role: '美工 / 设计部',
    company: '泉州迪洛宾商贸有限公司',
    detail: '负责产品图像排版、修图与视觉优化，协同运营、客服、产品团队迭代页面，并用 AI 辅助图像处理与输出。',
  },
  {
    period: '2023.10 — 2025.02',
    role: '美工 / 设计部',
    company: '白墨贸易有限公司',
    detail: '负责产品视觉、包装设计、视频剪辑与文字翻译，建立从商品图到内容页面的完整视觉链路。',
  },
  {
    period: '2021.03 — 2023.10',
    role: '平面设计渲染师 / 设计部',
    company: '泉州暖光设计有限公司',
    detail: '参与品牌平面设计、建模渲染与产品效果图制作，配合主创设计师完成效果图输出与排版。',
  },
  {
    period: '2016.03 — 2020.12',
    role: '施工员 / 项目部',
    company: '厦门集三建筑有限公司',
    detail: '负责现场监管、测量检查与施工协同，建立了对尺度、材料和空间落地的长期敏感度。',
  },
]

const commerceAdditionalItems = [
    { id: 'commerce-33', img: '/portfolio/commerce/10035133591682.png', height: 500, alt: '电商设计作品 33' },
    { id: 'commerce-34', img: '/portfolio/commerce/mmexport1784081373939.png', height: 520, alt: '电商设计作品 34' },
    { id: 'commerce-35', img: '/portfolio/commerce/mmexport1784081405431.png', height: 540, alt: '电商设计作品 35' },
    { id: 'commerce-36', img: '/portfolio/commerce/mmexport1784081438081.jpg', height: 560, alt: '电商设计作品 36' },
    { id: 'commerce-37', img: '/portfolio/commerce/mmexport1784081445313.jpg', height: 460, alt: '电商设计作品 37' },
    { id: 'commerce-38', img: '/portfolio/commerce/mmexport1784081448249.jpg', height: 480, alt: '电商设计作品 38' },
    { id: 'commerce-39', img: '/portfolio/commerce/mmexport1784081494313.jpg', height: 500, alt: '电商设计作品 39' },
    { id: 'commerce-40', img: '/portfolio/commerce/mmexport1784115415871.png', height: 520, alt: '电商设计作品 40' },
    { id: 'commerce-41', img: '/portfolio/commerce/mmexport1784115522458.jpg', height: 540, alt: '电商设计作品 41' },
    { id: 'commerce-42', img: '/portfolio/commerce/mmexport1784115545568.jpg', height: 560, alt: '电商设计作品 42' },
    { id: 'commerce-43', img: '/portfolio/commerce/mmexport1784115548642.jpg', height: 460, alt: '电商设计作品 43' },
    { id: 'commerce-44', img: '/portfolio/commerce/mmexport1784115549955.jpg', height: 480, alt: '电商设计作品 44' },
    { id: 'commerce-45', img: '/portfolio/commerce/mmexport1784115582263.jpg', height: 500, alt: '电商设计作品 45' },
    { id: 'commerce-46', img: '/portfolio/commerce/mmexport1784115584265.jpg', height: 520, alt: '电商设计作品 46' },
    { id: 'commerce-47', img: '/portfolio/commerce/mmexport1784150167173.jpg', height: 540, alt: '电商设计作品 47' },
    { id: 'commerce-48', img: '/portfolio/commerce/mmexport1784150179733.jpg', height: 560, alt: '电商设计作品 48' },
    { id: 'commerce-49', img: '/portfolio/commerce/mmexport1784150248454.jpg', height: 460, alt: '电商设计作品 49' },
    { id: 'commerce-50', img: '/portfolio/commerce/mmexport1784150380804.jpg', height: 480, alt: '电商设计作品 50' },
    { id: 'commerce-51', img: '/portfolio/commerce/mmexport1784150523825.png', height: 500, alt: '电商设计作品 51' },
    { id: 'commerce-52', img: '/portfolio/commerce/mmexport1784150550520.png', height: 520, alt: '电商设计作品 52' },
    { id: 'commerce-53', img: '/portfolio/commerce/mmexport1784150556185.png', height: 540, alt: '电商设计作品 53' },
    { id: 'commerce-54', img: '/portfolio/commerce/mmexport1784150634996.png', height: 560, alt: '电商设计作品 54' },
    { id: 'commerce-55', img: '/portfolio/commerce/mmexport1784150647573.png', height: 460, alt: '电商设计作品 55' },
    { id: 'commerce-56', img: '/portfolio/commerce/mmexport1784151044532.jpg', height: 480, alt: '电商设计作品 56' },
    { id: 'commerce-57', img: '/portfolio/commerce/mmexport1784151058453.jpg', height: 500, alt: '电商设计作品 57' },
    { id: 'commerce-58', img: '/portfolio/commerce/mmexport1784151135785.png', height: 520, alt: '电商设计作品 58' },
    { id: 'commerce-59', img: '/portfolio/commerce/mmexport1784151148261.png', height: 540, alt: '电商设计作品 59' },
    { id: 'commerce-60', img: '/portfolio/commerce/mmexport1784151164017.png', height: 560, alt: '电商设计作品 60' },
    { id: 'commerce-61', img: '/portfolio/commerce/mmexport1784151167818.png', height: 460, alt: '电商设计作品 61' },
    { id: 'commerce-62', img: '/portfolio/commerce/mmexport1784151190068.png', height: 480, alt: '电商设计作品 62' },
    { id: 'commerce-63', img: '/portfolio/commerce/mmexport1784201132445.jpg', height: 500, alt: '电商设计作品 63' },
    { id: 'commerce-64', img: '/portfolio/commerce/mmexport1784201138439.jpg', height: 520, alt: '电商设计作品 64' },
    { id: 'commerce-65', img: '/portfolio/commerce/mmexport1784201161001.jpg', height: 540, alt: '电商设计作品 65' },
    { id: 'commerce-66', img: '/portfolio/commerce/mmexport1784201232693.jpg', height: 560, alt: '电商设计作品 66' },
    { id: 'commerce-67', img: '/portfolio/commerce/mmexport1784545703025.jpg', height: 460, alt: '电商设计作品 67' },
    { id: 'commerce-68', img: '/portfolio/commerce/mmexport1784545801482.jpg', height: 480, alt: '电商设计作品 68' },
    { id: 'commerce-69', img: '/portfolio/commerce/mmexport1784545857332.jpg', height: 500, alt: '电商设计作品 69' },
    { id: 'commerce-70', img: '/portfolio/commerce/commerce-70.jpg', height: 500, alt: '电商设计作品 70' },
    { id: 'commerce-71', img: '/portfolio/commerce/commerce-71.jpg', height: 620, alt: '电商设计作品 71' },
    { id: 'commerce-72', img: '/portfolio/commerce/commerce-72.jpg', height: 500, alt: '电商设计作品 72' },
    { id: 'commerce-detail-02', img: '/portfolio/commerce/commerce-detail-02.jpg', height: 720, alt: '电商详情页作品 02', longform: true },
    { id: 'commerce-detail-03', img: '/portfolio/commerce/commerce-detail-03.jpg', height: 720, alt: '电商详情页作品 03', longform: true },
    { id: 'commerce-detail-04', img: '/portfolio/commerce/commerce-detail-04.jpg', height: 720, alt: '电商详情页作品 04', longform: true },
]

const portfolioGroups = {
  graphic: [
    { id: 'graphic-01', img: '/portfolio/graphic/graphic-01.jpg', height: 560, alt: '平面设计作品 01' },
    { id: 'graphic-02', img: '/portfolio/graphic/graphic-02.jpg', height: 480, alt: '平面设计作品 02' },
    { id: 'graphic-03', img: '/portfolio/graphic/graphic-03.jpg', height: 640, alt: '平面设计作品 03' },
    { id: 'graphic-04', img: '/portfolio/graphic/graphic-04.jpg', height: 520, alt: '平面设计作品 04' },
    { id: 'graphic-05', img: '/portfolio/graphic/graphic-05.jpg', height: 600, alt: '平面设计作品 05' },
    { id: 'graphic-06', img: '/portfolio/graphic/graphic-06.jpg', height: 540, alt: '平面设计作品 06' },
  ],
  packaging: [
    { id: 'packaging-01', img: '/portfolio/packaging/packaging-01.png', height: 480, alt: '包装设计作品 01' },
    { id: 'packaging-02', img: '/portfolio/packaging/packaging-02.png', height: 420, alt: '包装设计作品 02' },
    { id: 'packaging-03', img: '/portfolio/packaging/packaging-03.png', height: 560, alt: '包装设计作品 03' },
    { id: 'packaging-04', img: '/portfolio/packaging/packaging-04.png', height: 500, alt: '包装设计作品 04' },
    { id: 'packaging-05', img: '/portfolio/packaging/packaging-05.png', height: 420, alt: '包装设计作品 05' },
  ],
  render: [
    { id: 'render-01', img: '/portfolio/render/render-01.png', height: 580, alt: '3D 渲染作品 01', longform: true },
    { id: 'render-02', img: '/portfolio/render/render-02.jpg', height: 520, alt: '3D 渲染作品 02', longform: true },
    { id: 'render-03', img: '/portfolio/render/render-03.jpg', height: 440, alt: '3D 渲染作品 03' },
    { id: 'render-04', img: '/portfolio/render/render-04.png', height: 620, alt: '3D 渲染作品 04' },
    { id: 'render-05', img: '/portfolio/render/render-05.jpg', height: 500, alt: '3D 渲染作品 05' },
    { id: 'render-06', img: '/portfolio/render/render-06.jpg', height: 460, alt: '3D 渲染作品 06' },
    { id: 'render-07', img: '/portfolio/render/render-07.jpg', height: 580, alt: '3D 渲染作品 07' },
    { id: 'render-08', img: '/portfolio/render/render-08.jpg', height: 540, alt: '3D 渲染作品 08', longform: true },
    { id: 'render-09', img: '/portfolio/render/render-09.jpg', height: 640, alt: '3D 渲染作品 09', longform: true },
    { id: 'render-10', img: '/portfolio/render/render-10.jpg', height: 520, alt: '3D 渲染作品 10' },
    { id: 'render-11', img: '/portfolio/render/render-11.jpg', height: 520, alt: '3D 渲染作品 11' },
  ],
  video: [
    { id: 'video-01', video: '/portfolio/video/video-01.mp4', mobileVideo: '/portfolio/video/video-01-mobile.mp4', img: '/portfolio/video/video-01-cover.jpg', height: 620, alt: '视频剪辑作品 01' },
    { id: 'video-02', video: '/portfolio/video/video-02-cf.mp4', mobileVideo: '/portfolio/video/video-02-mobile.mp4', img: '/portfolio/video/video-02-cf-cover.jpg', height: 520, alt: '视频剪辑作品 02' },
    { id: 'video-03', video: '/portfolio/video/video-03.mp4', mobileVideo: '/portfolio/video/video-03-mobile.mp4', img: '/portfolio/video/video-03-cover.jpg', height: 580, alt: '视频剪辑作品 03' },
    { id: 'video-04', video: '/portfolio/video/video-04-cf.mp4', mobileVideo: '/portfolio/video/video-04-mobile.mp4', img: '/portfolio/video/video-04-cf-cover.jpg', height: 560, alt: '视频剪辑作品 04' },
    { id: 'video-05', video: '/portfolio/video/video-05-cf.mp4', mobileVideo: '/portfolio/video/video-05-mobile.mp4', img: '/portfolio/video/video-05-cf-cover.jpg', height: 560, alt: '视频剪辑作品 05' },
    { id: 'video-06', video: '/portfolio/video/video-06-cf.mp4', mobileVideo: '/portfolio/video/video-06-mobile.mp4', img: '/portfolio/video/video-06-cf-cover.jpg', height: 560, alt: '视频剪辑作品 06' },
  ],
  commerce: [
    ...Array.from({ length: 32 }, (_, index) => {
      const number = String(index + 1).padStart(2, '0')
      const heights = [460, 520, 620, 480, 560, 500]
      return { id: `commerce-${number}`, img: `/portfolio/commerce/commerce-${number}.jpg`, height: heights[index % heights.length], alt: `电商设计作品 ${number}` }
    }).filter((item) => !['commerce-10', 'commerce-12', 'commerce-15'].includes(item.id)),
    ...commerceAdditionalItems,
    { id: 'commerce-detail-01', img: '/portfolio/commerce/commerce-detail-01.jpg', height: 720, alt: '电商详情页作品', longform: true },
  ],
}

const commerceCover = portfolioGroups.commerce.find((item) => item.id === 'commerce-31')?.img ?? portfolioGroups.commerce[0].img

const projects = [
  {
    number: '01',
    category: '平面设计',
    type: '平面设计 / 视觉系统',
    title: 'Graphic Systems',
    description: '从版式、色彩与信息层级出发，让平面画面更有秩序，也更容易被记住。',
    tags: ['版式设计', '信息排版', '视觉系统'],
    art: 'art-aurora',
    image: portfolioGroups.graphic[0].img,
    masonryItems: portfolioGroups.graphic,
  },
  {
    number: '02',
    category: '3D 渲染',
    type: '3D 渲染 / 材质研究',
    title: 'Material Stories',
    description: '从建模、材质到灯光，建立更接近真实触感的产品表达。',
    tags: ['3D 渲染', '灯光设计', '材质表现'],
    art: 'art-orbit',
    image: portfolioGroups.render[4].img,
    masonryItems: portfolioGroups.render,
  },
  {
    number: '03',
    category: '包装设计',
    type: '包装设计 / 标签系统',
    title: 'Quiet Objects',
    description: '从标签系统、色彩与信息层级出发，让包装在货架和屏幕上都保持清晰识别。',
    tags: ['包装设计', '品牌视觉', '视觉方向'],
    art: 'art-tide',
    image: portfolioGroups.packaging[4].img,
    masonryItems: portfolioGroups.packaging,
  },
  {
    number: '04',
    category: '电商设计',
    type: '电商设计 / 视觉系统',
    title: 'Commerce Systems',
    description: '从主图、详情页与信息排版出发，让商品在平台里更快被理解。',
    tags: ['电商视觉', '主图设计', '详情页设计'],
    art: 'art-grid',
    image: commerceCover,
    masonryItems: portfolioGroups.commerce,
  },
  {
    number: '05',
    category: '视频剪辑',
    type: '视频剪辑 / 动态包装',
    title: 'Motion Video',
    description: '把静态视觉延展到时间轴，用节奏、画面和声音组织一段更有沉浸感的内容。',
    tags: ['视频剪辑', '动态包装', 'AI 视觉'],
    art: 'art-video',
    image: portfolioGroups.video[0].img,
    video: portfolioGroups.video[0].video,
    mobileVideo: portfolioGroups.video[0].mobileVideo,
    masonryItems: portfolioGroups.video,
  },
]

const heroHighlights = [
  { number: '01', title: '平面设计', detail: 'Poster / graphic / layout', art: 'art-aurora', image: portfolioGroups.graphic[0].img },
  { number: '02', title: '包装设计', detail: 'Package / label / identity', art: 'art-orbit', image: portfolioGroups.packaging[4].img },
  { number: '03', title: '3D 渲染', detail: 'Material / light / form', art: 'art-tide', image: portfolioGroups.render[4].img },
  { number: '04', title: '视频剪辑', detail: 'Motion / rhythm / edit', art: 'art-grid', image: portfolioGroups.video[0].img, video: portfolioGroups.video[0].video, mobileVideo: portfolioGroups.video[0].mobileVideo },
  { number: '05', title: '电商设计', detail: 'Product / retouch / layout', art: 'art-aurora', image: commerceCover },
]

const accordionItems = heroHighlights.map((item) => ({
  image: item.image,
  video: item.video,
  mobileVideo: item.mobileVideo,
  label: `${item.number} / ${item.title}`,
  alt: `${item.title} 作品缩略图`,
  link: '#work',
}))

const strengths = [
  {
    index: '01',
    title: '品牌视觉分析',
    copy: '从市场与用户视角拆解视觉问题，找到更有效的设计入口。',
    marks: ['Research', 'Visual strategy'],
  },
  {
    index: '02',
    title: 'AI 视觉工作流',
    copy: '用 AI 扩展图像生成、修图与合成的边界，同时保持画面判断力。',
    marks: ['AI image', 'Art direction'],
  },
  {
    index: '03',
    title: '3D 建模与渲染',
    copy: '理解模型、材质、灯光和镜头，让产品效果图有空间和触感。',
    marks: ['Modeling', 'Rendering'],
  },
  {
    index: '04',
    title: '视频与包装执行',
    copy: '可以完成基础的视频剪辑、动态包装与包装视觉，让画面从单张图延伸到完整内容。',
    marks: ['Video editing', 'Packaging'],
  },
]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function usePortfolioMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    let refreshId
    const context = gsap.context(() => {
      const sectionTriggers = gsap.utils.toArray('[data-motion-section]')

      sectionTriggers.forEach((section) => {
        const kicker = section.querySelector('[data-motion-kicker]')
        const kickerLine = kicker?.querySelector('.line')
        const titleLines = gsap.utils.toArray('[data-motion-title-line]', section)
        const copy = gsap.utils.toArray('[data-motion-copy]', section)
        const cards = gsap.utils.toArray('[data-motion-card]', section)

        const timeline = gsap.timeline({
          defaults: { ease: 'power4.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        })

        if (kicker) {
          timeline.fromTo(kicker, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
        }
        if (kickerLine) {
          timeline.fromTo(kickerLine, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, 0.15)
        }
        if (titleLines.length) {
          timeline.fromTo(titleLines, {
            yPercent: 125,
            skewY: 5,
            scaleY: 1.18,
            opacity: 0,
          }, {
            yPercent: 0,
            skewY: 0,
            scaleY: 1,
            opacity: 1,
            duration: 1.3,
            stagger: 0.11,
            ease: 'expo.out',
          }, 0.12)
        }
        if (copy.length) {
          timeline.fromTo(copy, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, titleLines.length ? '>-0.6' : 0.22)
        }
        if (cards.length) {
          timeline.fromTo(cards, {
            y: 76,
            scale: 0.9,
            rotateX: 7,
            opacity: 0,
            transformOrigin: '50% 100%',
          }, {
            y: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.12,
            ease: 'power4.out',
          }, copy.length || titleLines.length ? '>-0.42' : 0.2)
        }
      })

      const mediaBlocks = gsap.utils.toArray('[data-motion-media]')
      mediaBlocks.forEach((media) => {
        const target = media.querySelector('img, video') || media
        const trigger = media.closest('[data-motion-card]') || media

        gsap.fromTo(media, {
          clipPath: 'inset(0 0 100% 0)',
        }, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.35,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger,
            start: 'top 84%',
            once: true,
          },
        })

        gsap.fromTo(target, {
          scale: 1.16,
          y: 24,
        }, {
          scale: 1.03,
          y: 0,
          duration: 1.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger,
            start: 'top 84%',
            once: true,
          },
        })

        gsap.to(target, {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: media,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      })

      const hero = root.querySelector('[data-motion-hero]')
      if (hero) {
        const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
        const heroTitleLines = gsap.utils.toArray('[data-motion-title-line]', hero)
        heroTimeline.fromTo(heroTitleLines, {
          yPercent: 130,
          skewY: 6,
          scaleY: 1.22,
          opacity: 0,
        }, {
          yPercent: 0,
          skewY: 0,
          scaleY: 1,
          opacity: 1,
          duration: 1.45,
          stagger: 0.13,
          ease: 'expo.out',
        }, 0.15)
        heroTimeline.fromTo(hero.querySelector('.eyebrow'), { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85 }, 0.28)
        heroTimeline.fromTo(hero.querySelector('.hero-lede'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.7)
        heroTimeline.fromTo(hero.querySelector('.hero-actions'), { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.85)
        heroTimeline.fromTo(hero.querySelector('.hero-stat-strip'), { y: 46, scaleX: 0.88, opacity: 0, transformOrigin: '0% 50%' }, { y: 0, scaleX: 1, opacity: 1, duration: 1.1 }, 0.98)
        heroTimeline.fromTo(hero.querySelector('.hero-spec-card'), { x: 60, y: -18, rotateY: -8, opacity: 0 }, { x: 0, y: 0, rotateY: 0, opacity: 1, duration: 1.3, ease: 'expo.out' }, 0.42)
        heroTimeline.fromTo(hero.querySelector('.circle-link'), { scale: 0.6, opacity: 0, rotate: -28 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.1, ease: 'power4.out' }, 1.05)
        heroTimeline.fromTo(hero.querySelector('.hero-accordion'), { y: 58, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 1.08)
        heroTimeline.fromTo(hero.querySelector('.hero-bottom'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 1.2)
      }

      refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    }, root)

    return () => {
      if (refreshId) window.clearTimeout(refreshId)
      context.revert()
    }
  }, [rootRef])
}

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [selectedMasonryItem, setSelectedMasonryItem] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const motionRoot = useRef(null)

  usePortfolioMotion(motionRoot)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (selectedMasonryItem) setSelectedMasonryItem(null)
      else if (activeProject) setActiveProject(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeProject, selectedMasonryItem])

  return (
    <main ref={motionRoot}>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <button className="wordmark" onClick={() => scrollToId('top')} aria-label="回到首页">
          <span className="wordmark-mark">L/DF</span>
          <span className="wordmark-copy">LAI DENGFENG<br /><small>视觉设计 / AI / 3D</small></span>
        </button>
        <span className="header-availability"><span className="availability-dot" /> 目前接受精选项目</span>
        <nav className="main-nav" aria-label="主导航">
          <button onClick={() => scrollToId('about')}>01 / 关于我</button>
          <button onClick={() => scrollToId('work')}>02 / 精选作品</button>
          <button onClick={() => scrollToId('strengths')}>03 / 能力优势</button>
        </nav>
        <a className="contact-chip" href="#contact">联系我 <span>↗</span></a>
      </header>

      <section className="hero" id="top" data-motion-hero>
        <video className="hero-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
          <source src="/hero-background-mobile.mp4" type="video/mp4" media="(max-width: 760px)" />
          <source src={videoSource} type="video/mp4" media="(min-width: 761px)" />
        </video>
        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="hero-content page-shell">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> 01 / 视觉设计作品集</div>
            <h1>
              <span className="motion-title-mask"><span className="motion-title-line" data-motion-title-line>赖登峰</span></span>
              <span className="motion-title-mask"><span className="motion-title-line" data-motion-title-line><em>LAI DENGFENG</em></span></span>
            </h1>
            <p className="hero-lede">视觉设计师 · AI 设计师 · 3D 渲染师<br />把品牌、产品和空间，转换成更有秩序的视觉语言。</p>
            <div className="hero-actions"><button className="hero-primary" onClick={() => scrollToId('work')}>查看作品 <span>↗</span></button><button className="hero-secondary" onClick={() => scrollToId('about')}>关于我 <span>↘</span></button></div>
            <div className="hero-stat-strip"><div><strong>10+</strong><span>创作<br />经验</span></div><div><strong>04</strong><span>职业<br />阶段</span></div><div><strong>03</strong><span>核心视觉<br />方向</span></div></div>
          </div>
          <aside className="hero-spec-card">
            <div className="spec-heading"><span>设计 / 图像 / 形式</span><span>03 / 03</span></div>
            <div className="spec-item"><span className="spec-icon">◌</span><div><strong>视觉设计</strong><small>品牌 / 产品 / 图像</small></div></div>
            <div className="spec-item"><span className="spec-icon">✳</span><div><strong>AI 视觉</strong><small>更快探索，更好决策</small></div></div>
            <div className="spec-item"><span className="spec-icon">◇</span><div><strong>3D / 形式</strong><small>材质 / 光线 / 空间</small></div></div>
            <div className="spec-footer"><span>我的方法</span><b>让画面更清晰</b></div>
          </aside>
          <button className="circle-link" onClick={() => scrollToId('work')} aria-label="查看精选项目"><span>↘</span><small>浏览作品</small></button>
        </div>
        <div className="hero-accordion page-shell">
          <AccordionGallery
            items={accordionItems}
            defaultIndex={2}
            accentColor="#d1ef65"
            overlayColor="#06171d"
            textColor="#ecede9"
            height={108}
            gap={8}
            radius={8}
            expandRatio={0.24}
            trigger="hover"
            parallax={0.42}
            tilt={4}
            grayscale={false}
            className="hero-accordion-gallery"
          />
        </div>
        <div className="hero-bottom page-shell">
          <div className="hero-feature-bar"><div><span className="feature-icon">◒</span><span><strong>视觉方向</strong><small>让画面更清晰。</small></span></div><div><span className="feature-icon">⌁</span><span><strong>AI 工作流</strong><small>更快探索 / 更好决策。</small></span></div><div><span className="feature-icon">◇</span><span><strong>材质感知</strong><small>光线 / 表面 / 空间。</small></span></div><div><span className="feature-icon">✳</span><span><strong>开放合作</strong><small>仅接受精选项目。</small></span></div></div>
          <span className="hero-page-count">01 — 05</span>
        </div>
      </section>

      <section className="about section-shell" id="about" data-motion-section>
        <div className="section-kicker" data-motion-kicker><span>01</span><span>About the maker</span><span className="line" /></div>
        <div className="about-layout">
          <div className="about-intro">
            <p className="display-label motion-title">
              <span className="motion-title-mask"><span className="motion-title-line" data-motion-title-line>A designer</span></span>
              <span className="motion-title-mask"><span className="motion-title-line" data-motion-title-line>with a builder's eye.</span></span>
            </p>
            <p className="body-copy" data-motion-copy>我是赖登峰，一名视觉设计师 / AI 设计师 / 3D 渲染师。十年跨越建筑、空间与品牌视觉的工作经验，让我习惯从结构出发，再回到画面。</p>
            <a className="text-link" data-motion-copy href="mailto:723418586@qq.com">Start a conversation <span>↗</span></a>
          </div>
          <div className="profile-card" data-motion-card>
            <div className="profile-portrait" data-motion-media aria-label="赖登峰的马元素3D人物IP">
              <img className="profile-ip" src="/portrait-ip.png" alt="马元素3D人物IP：视觉设计师形象" />
              <div className="portrait-caption">YEAR OF THE HORSE<br />LIGHT / FORM / AI</div>
            </div>
            <div className="profile-meta"><span>赖登峰 / LAI DENGFENG</span><span>QUANZHOU, FUJIAN</span></div>
            <a className="profile-email" href="mailto:723418586@qq.com">723418586@qq.com</a>
          </div>
        </div>
        <div className="stat-row" data-motion-card>
          <div><strong>10</strong><span>YEARS OF<br />MAKING</span></div>
          <div><strong>04</strong><span>CAREER<br />CHAPTERS</span></div>
          <div><strong>02</strong><span>DEGREES IN<br />DESIGN ADJACENCY</span></div>
          <div className="stat-note">CURRENTLY OPEN TO<br /><b>SELECTED COLLABORATIONS</b></div>
        </div>
        <div className="experience-head"><span>Experience</span><span>2016 — NOW</span></div>
        <div className="experience-list">
          {experience.map((item, index) => (
            <BorderGlow
              key={item.company}
              className="experience-glow"
              data-motion-card
              edgeSensitivity={35}
              glowColor="190 80 70"
              backgroundColor="#11191b"
              borderRadius={10}
              glowRadius={24}
              glowIntensity={0.9}
              coneSpread={28}
              colors={['#62d6e8', '#d1ef65', '#738bff']}
              fillOpacity={0.18}
            >
              <article className="experience-item">
                <span className="experience-index">0{index + 1}</span>
                <div className="experience-time">{item.period}</div>
                <div className="experience-role"><strong>{item.company}</strong><span>{item.role}</span></div>
                <p>{item.detail}</p>
              </article>
            </BorderGlow>
          ))}
        </div>
      </section>

      <section className="work section-shell" id="work" data-motion-section>
        <div className="section-kicker" data-motion-kicker><span>02</span><span>Selected work</span><span className="line" /></div>
        <div className="work-intro"><h2 className="motion-title"><span className="motion-title-mask"><span className="motion-title-line" data-motion-title-line>Selected</span></span><span className="motion-title-mask"><span className="motion-title-line" data-motion-title-line><em>signals.</em></span></span></h2><div className="work-intro-meta" data-motion-copy><p>部分真实作品已接入。电商视觉、包装设计、AI 图像与后续视频作品会持续更新。</p><div className="work-modes"><span>IMAGE</span><span>PACKAGING</span><span>VIDEO / NEXT</span></div></div></div>
        <div className="project-grid">
          {projects.map((project) => (
            <button className={`project-card ${project.art}`} data-motion-card key={project.number} onClick={() => { setSelectedMasonryItem(null); setActiveProject(project) }}>
              <div className="project-art" data-motion-media aria-hidden="true">{project.image && <img className="project-image" src={project.image} alt="" loading="lazy" decoding="async" />}<span className="project-image-overlay" /><span className="art-label"><b>{project.number}</b><span> / {project.category}</span></span><span className="art-glow" /><span className="art-shape shape-a" /><span className="art-shape shape-b" /><span className="art-grid-lines" /></div>
              <div className="project-info"><div className="project-type">{project.type}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              <span className="project-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="strengths section-shell" id="strengths" data-motion-section>
        <div className="section-kicker" data-motion-kicker><span>03</span><span>What I bring</span><span className="line" /></div>
        <div className="strengths-layout"><h2 className="motion-title"><span className="motion-title-mask"><span className="motion-title-line" data-motion-title-line>Useful</span></span><span className="motion-title-mask"><span className="motion-title-line" data-motion-title-line><em>tension.</em></span></span></h2><p data-motion-copy>好的视觉既需要想象力，也需要让事情真正发生的耐心。</p></div>
        <div className="strength-grid">
          {strengths.map((item) => (
            <article className="strength-card" data-motion-card key={item.index}><span className="strength-index">{item.index}</span><h3>{item.title}</h3><p>{item.copy}</p><div className="strength-marks">{item.marks.map((mark) => <span key={mark}>{mark}</span>)}</div></article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" data-motion-section>
        <div className="contact-orbit orbit-one" /><div className="contact-orbit orbit-two" /><div className="contact-scanline" />
        <div className="contact-inner page-shell">
          <div className="contact-topline"><div className="section-kicker" data-motion-kicker><span>04</span><span>Contact</span><span className="line" /></div><span className="contact-status"><span className="availability-dot" /> OPEN FOR SELECTED PROJECTS</span></div>
          <div className="contact-layout">
            <div className="contact-copy"><p className="contact-overline" data-motion-copy>LET'S BUILD A CLEARER SIGNAL</p><h2 className="motion-title"><span className="motion-title-mask"><span className="motion-title-line" data-motion-title-line>Let's make it</span></span><span className="motion-title-mask"><span className="motion-title-line" data-motion-title-line><em>visible.</em></span></span></h2><p className="contact-summary" data-motion-copy>如果你有品牌、产品、电商视觉或 AI 视觉方向的项目，欢迎把问题交给我。</p><a className="contact-email" data-motion-copy href="mailto:723418586@qq.com">723418586@qq.com <span>↗</span></a></div>
            <div className="contact-portrait" data-motion-card><div className="contact-portrait-frame" data-motion-media><img src="/portrait-ip.png" alt="赖登峰的马元素 3D 人物 IP" /></div><div className="contact-portrait-meta"><span>LAI DENGFENG</span><span>YEAR OF THE HORSE / 3D IP</span></div></div>
            <aside className="contact-side-panel" data-motion-card><span className="contact-side-kicker">CONTACT / 04</span><a href="#work">SELECTED WORK <span>↗</span></a><a href="#about">ABOUT THE MAKER <span>↗</span></a><a href="mailto:723418586@qq.com">SEND A BRIEF <span>↗</span></a><strong>MAKE<br />THE<br />SIGNAL<br /><em>CLEAR.</em></strong><span className="contact-side-foot">视觉设计 / AI / 3D</span></aside>
          </div>
          <div className="contact-footer"><span>LAI DENGFENG / 2026</span><span>视觉设计 · AI 视觉 · 3D 渲染</span><button onClick={() => scrollToId('top')}>BACK TO TOP ↑</button></div>
        </div>
      </section>

      {activeProject && (
        <div className="project-modal masonry-modal" role="dialog" aria-modal="true" aria-label={activeProject.title} onClick={() => { setSelectedMasonryItem(null); setActiveProject(null) }}>
          <div className="masonry-modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="masonry-modal-head">
              <div>
                <div className="masonry-modal-kicker"><span>{activeProject.number} / SELECTED WORK</span><span>{activeProject.masonryItems.length} PIECES</span></div>
                <h3>{activeProject.title}</h3>
                <p>{activeProject.description}</p>
                <div className="project-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            <button className="modal-close" onClick={() => { setSelectedMasonryItem(null); setActiveProject(null) }} aria-label="关闭">×</button>
          </div>
          <div className="masonry-stage" style={{ '--masonry-items': activeProject.masonryItems.length }}>
              <Masonry items={activeProject.masonryItems} ease="power3.out" duration={0.6} stagger={0.05} animateFrom="bottom" scaleOnHover hoverScale={0.95} blurToFocus colorShiftOnHover={false} onItemClick={setSelectedMasonryItem} />
            </div>
            <div className="masonry-modal-foot"><span>LAI DENGFENG / PORTFOLIO ARCHIVE</span><span>点击画面可继续浏览作品</span></div>
          </div>
        </div>
      )}
      {activeProject && selectedMasonryItem && (
        <div className={`masonry-lightbox${selectedMasonryItem.longform ? ' is-longform' : ''}`} role="dialog" aria-modal="true" aria-label={selectedMasonryItem.alt || '查看原图'} onClick={() => setSelectedMasonryItem(null)}>
          <div className="masonry-lightbox-card" onClick={(event) => event.stopPropagation()}>
            <div className="masonry-lightbox-head"><span>{selectedMasonryItem.alt || '作品原图'}</span><button className="modal-close" onClick={() => setSelectedMasonryItem(null)} aria-label="关闭原图">×</button></div>
            <div className="masonry-lightbox-media">
              {selectedMasonryItem.video ? <video poster={selectedMasonryItem.img} controls autoPlay muted playsInline preload="auto"><source src={selectedMasonryItem.mobileVideo || selectedMasonryItem.video} type="video/mp4" media="(max-width: 760px)" /><source src={selectedMasonryItem.video} type="video/mp4" media="(min-width: 761px)" /></video> : <img src={selectedMasonryItem.img} alt={selectedMasonryItem.alt || '作品原图'} />}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App

createRoot(document.getElementById('root')).render(<App />)
