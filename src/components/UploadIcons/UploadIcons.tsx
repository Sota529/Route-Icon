import React from 'react'
import { useGetRandomSpinSpeed } from '../../hooks/useGetRandomSpinSpeed'
import { Draggable } from '../Draggable'
import { Icon } from '../Icon'

export const UploadIcons: React.FC<{ image: string | ArrayBuffer; count: string }> = (props) => {
  const randomSpinSpeed = useGetRandomSpinSpeed(Number(props.count))
  const Component = Array.from({ length: Number(props.count) }, (_, i) => {
    return (
      <Draggable key={String(props.image) + i}>
        <Icon src={String(props.image)} className={`box-border ` + randomSpinSpeed[i]} />
      </Draggable>
    )
  })
  return Component
}
