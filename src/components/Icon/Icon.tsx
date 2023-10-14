import React from 'react'

type IconProps = {
  src: string
  alt?: string
  className?: string
} & React.ComponentProps<'div'>

export const Icon: React.FC<IconProps> = ({ className, src, alt, ...rest }) => {
  return (
    <div className={className} {...rest}>
      <img src={src} alt={alt ?? 'アップロードされた画像'} />
    </div>
  )
}
