import { useRef, useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

export const useResponsiveContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(600)

  const isDesktop = useMediaQuery({ minWidth: 1200 })
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1199 })
  const isMobile = useMediaQuery({ maxWidth: 640 })

  useEffect(() => {
    if (isDesktop) setContainerWidth(776)
    else if (isTablet) setContainerWidth(552)
    else if (isMobile) setContainerWidth(264)
  }, [isDesktop, isTablet, isMobile])

  return { containerRef, containerWidth }
}
