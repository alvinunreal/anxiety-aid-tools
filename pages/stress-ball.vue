<template>
  <!-- Original Pen Author: Emil Andersson - https://codepen.io/emilandersson/pen/bNNOYyK -->
  <div class="page-container bg-white dark:bg-slate-900">
    <div class="stress-ball-container w-full h-full overflow-hidden font-medium">
      <div class="ball"></div>
    </div>
    
    <div class="border-t border-gray-300 dark:border-slate-600">
    <RelatedTechniques current-technique-id="progressive-muscle-relaxation" />
    </div>
  </div>

</template>

<script setup>
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

const { t } = useI18n()

useSeoMeta({
  title: t('meta.stressBall.title'),
  description: t('meta.stressBall.description'),
  ogTitle: t('meta.stressBall.title'),
  ogDescription: t('meta.stressBall.description'),
  ogType: 'website',
  twitterTitle: t('meta.stressBall.title'),
  twitterDescription: t('meta.stressBall.description'),
  twitterCard: 'summary_large_image'
})

if (import.meta.client) {
  gsap.registerPlugin(Draggable, InertiaPlugin)
}

let isCurrentlyDragging = false
let ball, ballProps, radius, tracker, vw, vh, draggable
const friction = -0.5

onMounted(() => {
  if (import.meta.client) {
    initStressBall()
  }
})


function initStressBall() {
  ball = document.querySelector('.ball')
  if (!ball) return

  const container = document.querySelector('.stress-ball-container')
  if (!container) return

  ballProps = gsap.getProperty(ball)
  radius = ball.getBoundingClientRect().width / 2
  tracker = InertiaPlugin.track(ball, 'x,y')[0]

  vw = container.clientWidth
  vh = container.clientHeight

  gsap.defaults({
    overwrite: true
  })

  gsap.set(ball, {
    xPercent: -50,
    yPercent: -50,
    x: vw / 2,
    y: vh / 2,
    rotation: 0
  })

  draggable = new Draggable(ball, {
    bounds: container,
    onPress() {
      gsap.killTweensOf(ball)
      this.update()
      isCurrentlyDragging = true
    },
    onRelease() {
      isCurrentlyDragging = false
    },
    onDragEnd: animateBounce,
    onDragEndParams: []
  })

  window.addEventListener('resize', () => {
    const container = document.querySelector('.stress-ball-container')
    if (!container) return
    vw = container.clientWidth
    vh = container.clientHeight
  })

  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null && isCurrentlyDragging && draggable.isDragging) {
      const x = ballProps('x')
      const y = ballProps('y')
      const vx = tracker.get('x')
      const vy = tracker.get('y')

      const boostFactor = 2.0

      draggable.endDrag(e)
      isCurrentlyDragging = false

      animateBounce(x, y, vx * boostFactor, vy * boostFactor)
    }
  })
}

function animateBounce(x = '+=0', y = '+=0', vx = 'auto', vy = 'auto') {
  const velocityX = tracker.get('x')
  const velocityY = tracker.get('y')

  const velocityMagnitude = Math.sqrt(velocityX ** 2 + velocityY ** 2)
  const direction = velocityX >= 0 ? 1 : -1
  const angularVelocity = direction * velocityMagnitude * 0.25

  const currentRotation = ballProps('rotation')

  gsap.to(ball, {
    rotation: currentRotation + angularVelocity,
    duration: 2,
    ease: 'power2.out',
    overwrite: false
  })

  gsap.fromTo(
    ball,
    { x, y },
    {
      inertia: {
        x: vx,
        y: vy
      },
      onUpdate: checkBounds,
      overwrite: 'auto'
    }
  )
}

function checkBounds() {
  const r = radius
  let x = ballProps('x')
  let y = ballProps('y')
  let vx = tracker.get('x')
  let vy = tracker.get('y')
  let xPos = x
  let yPos = y
  let hitEdge = false
  let originalVx, originalVy

  function squash(axis, velocity) {
    gsap.killTweensOf(ball, 'scaleX,scaleY')

    const velocityDivisor = 200
    const minImpact = 0.01
    const maxImpact = 0.1

    const absVelocity = Math.abs(velocity)
    const impact = gsap.utils.clamp(
      minImpact,
      maxImpact,
      absVelocity / velocityDivisor
    )

    const squashScale = 1 - impact * 0.9
    const stretchScale = 1 + impact * 0.6

    const squashProps =
      axis === 'x'
        ? { scaleX: squashScale, scaleY: stretchScale }
        : { scaleX: stretchScale, scaleY: squashScale }

    gsap
      .timeline()
      .to(ball, {
        ...squashProps,
        duration: 0.1,
        ease: 'power2.out',
        transformOrigin: 'center center',
        overwrite: true
      })
      .to(ball, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: false
      })
  }

  if (x + r > vw) {
    originalVx = vx
    xPos = vw - r
    vx *= friction
    hitEdge = true
    squash('x', originalVx)
  } else if (x - r < 0) {
    originalVx = vx
    xPos = r
    vx *= friction
    hitEdge = true
    squash('x', originalVx)
  }

  if (y + r > vh) {
    originalVy = vy
    yPos = vh - r
    vy *= friction
    hitEdge = true
    squash('y', originalVy)
  } else if (y - r < 0) {
    originalVy = vy
    yPos = r
    vy *= friction
    hitEdge = true
    squash('y', originalVy)
  }

  if (hitEdge) {
    gsap.killTweensOf(ball)
    animateBounce(xPos, yPos, vx, vy)
  }
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.stress-ball-container {
  background: linear-gradient(135deg, #8a9aa8 0%, #64727c 50%, #545f68 100%);
  font-weight: 500;
  width: 100%;
  height: calc(100vh - 200px);
  min-height: 400px;
  overflow: hidden;
  position: relative;
  border-bottom: 4px solid rgba(255, 255, 255, 0.2);
  background-image:
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    repeating-conic-gradient(from 0deg at 50% 50%,
      transparent 0deg,
      rgba(255, 255, 255, 0.02) 45deg,
      transparent 90deg,
      rgba(255, 255, 255, 0.02) 135deg,
      transparent 180deg);
  background-size: 40px 40px, 60px 60px, 80px 80px;
}

@media (prefers-color-scheme: dark) {
  .stress-ball-container {
    background: linear-gradient(135deg, #334155 0%, #1e293b 50%, #0f172a 100%);
    border-bottom-color: #475569;
  }
}

.backdrop {
  padding: 0.4rem 0.7rem;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  display: flex;
  align-content: center;
  justify-content: center;
  position: relative;
  z-index: 9999;
}

.ball {
  --ball-size: 200px;
  width: var(--ball-size);
  height: var(--ball-size);
  background: var(--ball-bg);
  border-radius: 50%;
  will-change: transform;
  position: absolute;
  box-shadow: inset -10px -10px 30px rgba(0, 0, 0, 0.3),
    inset 10px 10px 30px rgba(255, 255, 255, 0.2),
    0 15px 30px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  transform-origin: center center;
  transform: translateZ(0);
  filter: var(--filter);
}

@media (min-height: 800px) {
  .ball {
    --ball-size: 260px;
  }
}

@media (max-width: 700px) {
  .ball {
    --ball-size: 160px;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(0, 0, 0, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>