<template>
  <canvas
    ref="canvas"
    class="d-block fill-width fill-height"
    @click="handleClick"
  />
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    onBeforeUnmount,
    ref,
    nextTick,
  } from 'vue'

  export default defineComponent({
    name: 'GridBackground',
    setup () {
      const canvas = ref<HTMLCanvasElement | null>(null)
      let animationFrameId: number
      let lastTimestamp = performance.now()

      let gridBrightness: number[][] = []
      let gridSize = 0
      let cols = 0
      let rows = 0
      const fadeSpeed = 0.002

      const handleMouseMove = (e: MouseEvent) => {
        if (!canvas.value) return
        const rect = canvas.value.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const col = Math.floor(x / gridSize)
        const row = Math.floor(y / gridSize)

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const r = row + dy
            const c = col + dx

            if (gridBrightness[r] && gridBrightness[r][c] !== undefined) {
              if (dx === 0 && dy === 0) {
                gridBrightness[r][c] = 1
              } else if (dx === 0 || dy === 0) {
                gridBrightness[r][c] = Math.max(gridBrightness[r][c], 0.4)
              } else {
                gridBrightness[r][c] = Math.max(gridBrightness[r][c], 0.2)
              }
            }
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
        const newCols = Math.floor(width / targetSize)
        const newGridSize = width / newCols
        const newRows = Math.ceil(height / newGridSize)

        // 如果大小變了才重建
        if (cols !== newCols || rows !== newRows || gridSize !== newGridSize) {
          cols = newCols
          rows = newRows
          gridSize = newGridSize
          gridBrightness = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0)
          )
        }

        ctx.lineWidth = 1

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * gridSize
            const y = row * gridSize
            const brightness = gridBrightness[row][col]

            // 根據時間差控制漸暗速度
            gridBrightness[row][col] = Math.max(0, brightness - delta * fadeSpeed)

            const alpha = 0.05 + brightness * 0.95
            ctx.strokeStyle = `rgba(149, 117, 205, ${alpha})`
            ctx.strokeRect(x, y, gridSize, gridSize)
          }
        }
      }

      const animate = () => {
        const now = performance.now()
        const delta = now - lastTimestamp
        lastTimestamp = now

        const ctx = canvas.value?.getContext('2d')
        if (!ctx || !canvas.value) return

        const { width, height } = canvas.value
        ctx.clearRect(0, 0, width, height)

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

      const handleClick = (e: MouseEvent) => {
        if (!canvas.value) return
        const rect = canvas.value.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        console.log(`Clicked at (${x}, ${y})`)
      }

      onMounted(() => {
        nextTick(() => {
          resizeCanvas()
          window.addEventListener('resize', resizeCanvas)
          window.addEventListener('mousemove', handleMouseMove)
          animate()
        })
      })

      onBeforeUnmount(() => {
        cancelAnimationFrame(animationFrameId)
        window.removeEventListener('resize', resizeCanvas)
        window.removeEventListener('mousemove', handleMouseMove)
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
    pointer-events: none;
  }
</style>
