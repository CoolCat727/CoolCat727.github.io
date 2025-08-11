<template>
  <canvas
    ref="canvas"
    @click="handleClick"
  />
</template>

<script lang="ts">
  import {
    defineComponent,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue'

  interface Segment {
    x: number
    y: number
  }

  interface ElectricPath {
    segments: Segment[]
    headProgress: number
    tailProgress: number
    color: string
    speed: number
    totalLength: number
  }

  export default defineComponent({
    name: 'ElectricBackground',
    setup () {
      const canvas = ref<HTMLCanvasElement | null>(null)
      let animationFrameId: number
      const paths: ElectricPath[] = []

      const randomColor = () =>
        Math.random() > 0.5
          ? 'rgba(30, 213, 249, 1)'
          : 'rgba(138, 43, 226, 1)'

      const getPointAtLength = (segments: Segment[], targetLength: number): Segment => {
        let lengthSoFar = 0
        for (let i = 1; i < segments.length; i++) {
          const from = segments[i - 1]
          const to = segments[i]
          const dx = to.x - from.x
          const dy = to.y - from.y
          const segLen = Math.sqrt(dx * dx + dy * dy)

          if (lengthSoFar + segLen >= targetLength) {
            const t = (targetLength - lengthSoFar) / segLen
            return {
              x: from.x + dx * t,
              y: from.y + dy * t,
            }
          }

          lengthSoFar += segLen
        }
        return segments[segments.length - 1]
      }

      const generatePath = (x0: number, y0: number, width: number, height: number): ElectricPath => {
        const segments: Segment[] = [{ x: x0, y: y0 }]
        let x = x0
        let y = y0

        // 初始方向：x 或 y，+1 表示向右/下，-1 表示向左/上
        const dir = Math.random() > 0.5 ? 'x' : 'y'
        const sign1 = Math.random() > 0.5 ? 1 : -1

        // 初始至少走 min(width, height) * 0.5
        const firstDist = Math.min(width, height) * (0.5 + Math.random() * 0.3)
        if (dir === 'x') x += sign1 * firstDist
        else y += sign1 * firstDist
        segments.push({ x, y })

        // 轉彎：換軸（±90°）
        const newDir = dir === 'x' ? 'y' : 'x'
        const turnSign = Math.random() > 0.5 ? 1 : -1
        const secondDist = 80 + Math.random() * 120
        if (newDir === 'x') x += turnSign * secondDist
        else y += turnSign * secondDist
        segments.push({ x, y })

        // 延伸直到超出畫面邊界
        if (newDir === 'x') {
          x = turnSign > 0 ? width + 100 : -100
        } else {
          y = turnSign > 0 ? height + 100 : -100
        }
        segments.push({ x, y })

        // 計算總長度
        let totalLength = 0
        for (let i = 1; i < segments.length; i++) {
          const dx = segments[i].x - segments[i - 1].x
          const dy = segments[i].y - segments[i - 1].y
          totalLength += Math.sqrt(dx * dx + dy * dy)
        }

        return {
          segments,
          headProgress: 0,
          tailProgress: -Math.min(width, height),
          color: randomColor(),
          speed: 10 + Math.random() * 2,
          totalLength,
        }
      }

      const spawnFromEdge = (width: number, height: number) => {
        const edge = Math.floor(Math.random() * 4)
        let x = 0, y = 0

        switch (edge) {
          case 0: y = -10; x = Math.random() * width; break
          case 1: y = Math.random() * height; x = width + 10; break
          case 2: y = height + 10; x = Math.random() * width; break
          case 3: y = Math.random() * height; x = -10; break
        }

        paths.push(generatePath(x, y, width, height))
      }

      const handleClick = (e: MouseEvent) => {
        if (!canvas.value) return
        const rect = canvas.value.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const width = canvas.value.width
        const height = canvas.value.height
        paths.push(generatePath(x, y, width, height))
      }

      const animate = () => {
        const ctx = canvas.value?.getContext('2d')
        if (!ctx || !canvas.value) return

        const { width, height } = canvas.value
        ctx.clearRect(0, 0, width, height)

        if (Math.random() < 0.1) spawnFromEdge(width, height)

        for (let i = paths.length - 1; i >= 0; i--) {
          const p = paths[i]
          const segs = p.segments
          let lengthSoFar = 0
          let drawStarted = false
          ctx.beginPath()

          for (let s = 1; s < segs.length; s++) {
            const from = segs[s - 1]
            const to = segs[s]
            const dx = to.x - from.x
            const dy = to.y - from.y
            const segLen = Math.sqrt(dx * dx + dy * dy)

            const segStart = lengthSoFar
            const segEnd = lengthSoFar + segLen

            const visibleStart = Math.max(p.tailProgress, segStart)
            const visibleEnd = Math.min(p.headProgress, segEnd)

            if (visibleStart < visibleEnd) {
              const t1 = (visibleStart - segStart) / segLen
              const t2 = (visibleEnd - segStart) / segLen
              const x1 = from.x + dx * t1
              const y1 = from.y + dy * t1
              const x2 = from.x + dx * t2
              const y2 = from.y + dy * t2

              ctx.moveTo(x1, y1)
              ctx.lineTo(x2, y2)
              drawStarted = true
            }

            lengthSoFar += segLen
          }

          if (drawStarted) {
            const tHead = getPointAtLength(p.segments, p.headProgress)
            const tTail = getPointAtLength(p.segments, p.tailProgress)

            const grad = ctx.createLinearGradient(tTail.x, tTail.y, tHead.x, tHead.y)
            grad.addColorStop(0, 'rgba(255,255,255,0)')
            grad.addColorStop(1, p.color)

            ctx.strokeStyle = grad
            ctx.lineWidth = 5
            ctx.stroke()
          }

          p.headProgress += p.speed
          p.tailProgress += p.speed

          if (p.tailProgress > p.totalLength + 200) {
            paths.splice(i, 1)
          }
        }

        animationFrameId = requestAnimationFrame(animate)
      }

      const resizeCanvas = () => {
        const el = canvas.value
        if (el) {
          el.width = el.offsetWidth
          el.height = el.offsetHeight
        }
      }

      onMounted(() => {
        nextTick(() => {
          resizeCanvas()
          window.addEventListener('resize', resizeCanvas)
          animate()
        })
      })

      onBeforeUnmount(() => {
        cancelAnimationFrame(animationFrameId)
        window.removeEventListener('resize', resizeCanvas)
      })

      return {
        canvas,
        handleClick,
      }
    },
  })
</script>

<style scoped>
  canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
