import React, { useEffect, useRef } from 'react'
import style from '../styles/components/FloatingBubbles.module.css'

interface Bubble {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  element: HTMLDivElement
}

const FloatingBubbles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<Bubble[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const bubblesCount = Math.floor(Math.random() * 15) + 10 // 10-25 кружочков

    // Массив цветов: красный, зеленый, синий, желтый, розовый
    const colors = [
      { r: 255, g: 0, b: 0 }, // Красный
      { r: 0, g: 255, b: 0 }, // Зеленый
      { r: 0, g: 0, b: 255 }, // Синий
      { r: 255, g: 255, b: 0 }, // Желтый
      { r: 255, g: 105, b: 180 }, // Розовый
    ]

    // Создаем кружочки
    for (let i = 0; i < bubblesCount; i++) {
      const size = Math.random() * 40 + 10 // 10-50px
      const bubble = document.createElement('div')
      bubble.className = style.bubble

      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`

      // Выбираем случайный цвет
      const color = colors[Math.floor(Math.random() * colors.length)]
      const opacity = Math.random() * 0.4 + 0.3 // Прозрачность 0.3-0.7

      bubble.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
      bubble.style.boxShadow = `0 0 ${size / 4}px rgba(${color.r}, ${
        color.g
      }, ${color.b}, ${opacity * 0.8})`

      container.appendChild(bubble)

      bubblesRef.current.push({
        x: Math.random() * container.clientWidth,
        y: Math.random() * container.clientHeight,
        size,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        element: bubble,
      })
    }

    // Анимация движения
    let animationFrameId: number

    const animate = () => {
      bubblesRef.current.forEach((bubble) => {
        // Обновляем позицию
        bubble.x += bubble.speedX
        bubble.y += bubble.speedY

        // Отскок от границ
        if (bubble.x <= 0 || bubble.x >= container.clientWidth - bubble.size) {
          bubble.speedX *= -1
        }
        if (bubble.y <= 0 || bubble.y >= container.clientHeight - bubble.size) {
          bubble.speedY *= -1
        }

        // Применяем новую позицию
        bubble.element.style.transform = `translate(${bubble.x}px, ${bubble.y}px)`
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Обработчик изменения размера окна
    const handleResize = () => {
      bubblesRef.current.forEach((bubble) => {
        if (bubble.x > container.clientWidth - bubble.size) {
          bubble.x = container.clientWidth - bubble.size
        }
        if (bubble.y > container.clientHeight - bubble.size) {
          bubble.y = container.clientHeight - bubble.size
        }
      })
    }

    window.addEventListener('resize', handleResize)

    // Очистка
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      container.innerHTML = ''
      bubblesRef.current = []
    }
  }, [])

  return <div ref={containerRef} className={style.container} />
}

export default FloatingBubbles
