import React from 'react'

type IconProps = {
  src: string
  className?: string
} & React.ComponentProps<'div'>

export const Icon = ({ className, src, ...rest }: IconProps) => {
  return (
    <div className={className} {...rest}>
      <img src={src} alt="image" />
    </div>
  )
}
