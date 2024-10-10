"use client"

import React from "react"
import Link from "next/link"
import ProductThumbnail from "@/shared/ui/product/productThumbnail"
import {
  toDiscountPercent,
  toDiscountPrice,
  toPrice,
} from "@/shared/lib/productUtils"
import {
  GetProductInfoResponse,
  GetProductThumbnailResponse,
} from "@/shared/type/shop/product"

interface ProductItemProps {
  productInfo: GetProductInfoResponse
  productThumbnail: GetProductThumbnailResponse
  wrapperClass?: string
}

export function ProductItem({
  wrapperClass,
  productInfo,
  productThumbnail,
}: ProductItemProps) {
  return (
    <Link
      href={`/shop/product-detail/${productThumbnail.productId}`}
      className={`flex flex-1 flex-col gap-1 ${wrapperClass}`}>
      <ProductThumbnail
        imageProps={{
          src: String(productThumbnail?.src),
          alt: `${String(productInfo?.name)}.png`,
        }}
      />
      <span className="text-sb-black-100 break-words text-base font-normal">
        {productInfo?.name}
      </span>

      {productInfo?.isDiscounted ? (
        <div>
          <span className="text-sb-gray-100 text-base font-normal line-through">
            {toPrice(productInfo?.price)}원
          </span>
          <div className="flex items-center justify-between gap-1">
            <span className="text-sb-black-100 text-base font-bold">
              {toDiscountPrice(productInfo?.price, productInfo?.discountRate)}원
            </span>
            <span className="text-sb-green-100 text-base font-bold">
              {toDiscountPercent(productInfo?.discountRate)}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-1">
          <span className="text-sb-black-100 text-base font-bold">
            {toPrice(Number(productInfo?.price))}원
          </span>
        </div>
      )}
    </Link>
  )
}
