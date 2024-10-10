import Image, { ImageProps } from "next/image"
import React from "react"

interface ProductThumbnailProps {
  wrapperProps?: React.HTMLProps<HTMLDivElement>
  imageProps?: ImageProps
}

function ProductThumbnail({ wrapperProps, imageProps }: ProductThumbnailProps) {
  return (
    <div
      {...wrapperProps}
      className={`relative aspect-square object-cover ${wrapperProps?.className ?? ""}`}>
      <Image
        priority
        fill
        sizes="100%"
        {...imageProps}
        alt={imageProps?.alt ?? "product-thumbnail.png"}
        src={imageProps?.src ?? ""}
        className={`rounded`}
      />
    </div>
  )
}

export default ProductThumbnail
