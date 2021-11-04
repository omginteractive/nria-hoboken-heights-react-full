import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

const ImageZoom = ({ image }) => {
  return (
    <TransformWrapper initialScale={1} centerOnInit={true}>
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
}

export default ImageZoom
