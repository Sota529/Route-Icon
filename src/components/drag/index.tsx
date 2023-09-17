import React from 'react'

type DragProps = {
  children: React.ReactNode
}

export const Drag: React.FC<DragProps> = (props) => {
  const resizableRef = React.useRef<HTMLDivElement>(null)

  const [initialPostion, setInitialPostion] = React.useState(null)
  const [initialSize, setInitialSize] = React.useState(null)
  const handleDrag: React.DragEventHandler<HTMLDivElement> = (e) => {
    resizableRef.current.style.width = `${parseInt(initialSize) + parseInt(e.clientX - initialPostion)}px`
  }

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    const img = new Image()
    e.dataTransfer.setDragImage(img, 0, 0)
    setInitialPostion(e.clientX)
    resizableRef.current
    setInitialSize(resizableRef.current.offsetWidth)
  }
  return (
    <div onDrag={handleDrag} onDragStart={handleDragStart} ref={resizableRef} draggable className="cursor-col-resize">
      {props.children}
    </div>
  )
}
