"use client"

import React from "react"
import { useQueries } from "@tanstack/react-query"
import { getProductInfoAndThumbnail } from "@/shared/action/product/productAction"
import ProductItemSkeleton from "@/entity/product/ProductItemSkeleton"
import {
  GetProductInfoResponse,
  GetProductThumbnailResponse,
} from "@/shared/type/shop/product"
import { ProductItem } from "@/entity/product/productItem"
import ProductListContainer from "@/entity/product/productListContainer"

interface ProductItemsWrapperProps {
  productItemIds: number[]
}

function ProductItemsWrapper({ productItemIds }: ProductItemsWrapperProps) {
  const productItemQueries = useQueries({
    queries: productItemIds.map((id) => ({
      queryKey: ["productInfo", id],
      queryFn: () => getProductInfoAndThumbnail(id),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    })),
  })

  if (productItemQueries.find((query) => query.isLoading)) {
    return (
      <ProductListContainer>
        {productItemQueries.map((query, index) => {
          return <ProductItemSkeleton key={index} />
        })}
      </ProductListContainer>
    )
  }

  return (
    <>
      <ProductListContainer>
        {productItemQueries.map((query, index) => (
          <ProductItem
            key={index}
            productInfo={query?.data?.productInfo as GetProductInfoResponse}
            productThumbnail={
              query?.data?.productThumbnail as GetProductThumbnailResponse
            }
          />
        ))}
      </ProductListContainer>
    </>
  )
}

export default ProductItemsWrapper
