<template>
  <canvas ref="canvas" />
</template>
<script lang="ts">
  import {
    defineComponent,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue'
  import { useTheme } from 'vuetify'

  export default defineComponent({
    name: 'IntroCanvas',
    emits: ['animation-finished'],
    setup (_, { emit }) {
      const canvas = ref<HTMLCanvasElement | null>(null)
      const theme = useTheme()
      const themeBackground = theme.current.value.colors.background

      let animationFrameId: number
      let lastTimestamp = performance.now()

      let gridBrightness: number[][] = []
      let gridSize = 0
      let cols = 0
      let rows = 0
      let tick = 0
      let tickCounter = 0
      let phase = 0
      let backgroundAlpha = 1.0

      const waveDelay = 2

      const clearSelf = () => {
        const el = canvas.value
        if (el?.parentNode) {
          el.parentNode.removeChild(el)
        }
      }

      const waveAnimation = () => {
        for (let col = 0; col < cols; col++) {
          const localTick = tick - col * waveDelay
          if (localTick < 0 || localTick > rows * 2) continue

          const up = localTick <= rows
          const row = up ? rows - 1 - localTick : localTick - rows

          if (row >= 0 && row < rows) {
            gridBrightness[row][col] = 1
          }
        }
      }

      const fadeOutBackground = () => {
        backgroundAlpha = Math.max(0, backgroundAlpha - 0.4)
      }

      const isGridCleared = (): boolean => {
        const lastRow = gridBrightness[gridBrightness.length - 1];

        return lastRow[lastRow.length - 1] < 0.1;
      };


      const drawIntroPattern = (delta: number) => {
        tickCounter += delta * 1.4
        if (tickCounter < 1) return
        tickCounter = 0

        if (phase === 0) {
          waveAnimation()
          tick++

          const waveDuration = cols * waveDelay + rows * 2
          if (tick > waveDuration && isGridCleared()) {
            tick = 0
            phase = 1
          }
        } else if (phase === 1) {
          fadeOutBackground()
          if (backgroundAlpha === 0) {
            phase = 2
            cancelAnimationFrame(animationFrameId)
            emit('animation-finished')
            clearSelf()
          }
        }
      }

      const drawGrid = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        delta: number
      ) => {
        const targetSize = 50
        cols = Math.floor(width / targetSize)
        gridSize = width / cols
        rows = Math.ceil(height / gridSize)

        gridBrightness = Array.from({ length: rows }, (_, row) =>
          Array.from({ length: cols }, (_, col) => gridBrightness?.[row]?.[col] ?? 0)
        )

        drawIntroPattern(delta)

        ctx.fillStyle = hexToRgba(themeBackground, backgroundAlpha)
        ctx.fillRect(0, 0, width, height)

        ctx.lineWidth = 1
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * gridSize
            const y = row * gridSize
            const brightness = gridBrightness[row][col]

            gridBrightness[row][col] = Math.max(0, brightness - 0.02)

            const alpha = 0.05 + brightness * 0.95
            ctx.strokeStyle = `rgba(149, 117, 205, ${alpha})`
            ctx.strokeRect(x, y, gridSize, gridSize)
          }
        }
      }

      const hexToRgba = (hex: string, alpha: number): string => {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
      }

      const animate = (timestamp: number) => {
        const ctx = canvas.value?.getContext('2d')
        if (!ctx || !canvas.value) return

        const { width, height } = canvas.value
        ctx.clearRect(0, 0, width, height)

        const delta = timestamp - lastTimestamp
        lastTimestamp = timestamp

        drawGrid(ctx, width, height, delta)

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
          requestAnimationFrame(animate)
        })
      })

      onBeforeUnmount(() => {
        cancelAnimationFrame(animationFrameId)
        window.removeEventListener('resize', resizeCanvas)
      })

      return {
        canvas,
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
