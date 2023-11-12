import React, { useRef } from 'react'

type DraggableProps = {
  children: React.ReactElement
}

export const Draggable: React.FC<DraggableProps> = (props) => {
  const divRef = useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    dragElement(divRef.current)
  }, [])

  return (
    <div ref={divRef} className="absolute w-[100px] cursor-move">
      {props.children}
    </div>
  )
}

const dragElement = (elmnt: HTMLDivElement | null) => {
  const randomPositionX = roundToUnderPointEight(0.8)
  const randomPositionY = roundToUnderPointEight(0.9)
  if (elmnt) {
    elmnt.style.top = window.innerHeight * randomPositionX + 'px'
    elmnt.style.left = window.innerWidth * randomPositionY + 'px'
  }
  let X = 0,
    Y = 0,
    currentX = 0,
    currentY = 0

  const dragMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    currentX = e.clientX
    currentY = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  const elementDrag = (e: MouseEvent) => {
    e.preventDefault()
    X = currentX - e.clientX
    Y = currentY - e.clientY
    currentX = e.clientX
    currentY = e.clientY
    if (elmnt) {
      elmnt.style.top = elmnt.offsetTop - Y + 'px'
      elmnt.style.left = elmnt.offsetLeft - X + 'px'
    }
  }

  const closeDragElement = () => {
    document.onmouseup = null
    document.onmousemove = null
  }
  if (elmnt) {
    elmnt.onmousedown = dragMouseDown
  }
}

// num未満の乱数を生成する
const roundToUnderPointEight = (num: number) => {
  const r = Math.random()
  if (r > num) {
    return 0.7
  }
  return r
}
