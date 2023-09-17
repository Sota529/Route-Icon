import React, { useState } from 'react'
import './index.css' // スタイルシートのインポート

export const Resize = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [leftFrameWidth, setLeftFrameWidth] = useState('50%')

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newWidth = `${e.clientX}px`
      setLeftFrameWidth(newWidth)
    }
  }

  return (
    <div className="Container">
      <div id="LeftFrame1" className="LeftFrame" style={{ flexBasis: leftFrameWidth }}>
        <p>Item1</p>
        <p>Item2</p>
        <p>Item3</p>
        <p>Item4</p>
        <p>Item5</p>
      </div>
      <div
        id="Splitter1"
        className="Splitter"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></div>
      <div className="RightFrame">
        <p>Content1</p>
        <p>Content2</p>
        <p>Content3</p>
        <p>Content4</p>
        <p>Content5</p>
      </div>
    </div>
  )
}
