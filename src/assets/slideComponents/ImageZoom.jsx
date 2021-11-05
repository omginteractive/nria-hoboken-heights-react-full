import { useEffect, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

const ImageZoom = ({ image }) => {
  const [initialPosition, setInitialPosition] = useState(null)

  useEffect(() => {
    const img = 612
    const width = window.innerWidth
    const calcWidth = width > img ? width - img : 6;
    setInitialPosition(Math.floor(calcWidth / 2))
  }, [])

  return (
    initialPosition && (
      <TransformWrapper
        initialScale={1}
        initialPositionX={initialPosition}
        maxScale={3}
      >
        {({ zoomIn, zoomOut }) => (
          <>
            <div className="tools">
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
            </div>
            <TransformComponent>
              <img
                src={image}
                alt="full floorplan"
                className="full_floorplan_image"
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    )
  )
}

export default ImageZoom
