"use client"

import React, { useCallback, useEffect, useRef } from "react"
import useIntersectionObserver from "@/shared/hooks/useIntersectionObserver"
import { GetProductListIdsRequest } from "@/shared/type/shop/product"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getProductIds } from "@/shared/action/product/productAction"
import BaseLoader from "@/shared/ui/baseLoader"

import { defaultPaginationRequest } from "@/shared/type/common/request"
import ProductItemSkeleton from "@/entity/(shop)/product/ProductItemSkeleton"
import ProductItemsWrapper from "@/components/page/product/listpage/productItemsWrapper"

interface ProductListCLProps {
  reqOption: GetProductListIdsRequest
}

function ProductListCL({ reqOption }: ProductListCLProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    data,
  } = useInfiniteQuery({
    queryKey: ["product-list", reqOption],
    queryFn: ({ pageParam = 0 }) =>
      getProductIds({ ...reqOption, page: pageParam }),
    getNextPageParam: (lastPage) => {
      console.log("in getNextpageParam : ", lastPage.last, "\n\n", lastPage)
      if (!lastPage.last) {
        return lastPage.pageable.pageNumber + 1
      }
      return undefined
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
  })

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage()
    if (res.isError) {
      console.log(res.error)
    }
  }, [fetchNextPage])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let timerId: NodeJS.Timeout | undefined

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext()
      }, 300)
    }
    return () => clearTimeout(timerId)
  }, [fetchNext, isPageEnd, hasNextPage])

  return (
    <>
      <div className="flex flex-col gap-4 px-[30px] py-4">
        {/*<ProductList>*/}
        {/*	{data?.pages?.map((page, index) => (*/}
        {/*		<React.Fragment key={index}>*/}
        {/*			{page.content.map((id) => (*/}
        {/*				<ProductItemCL key={id} id={id} />*/}
        {/*			))}*/}
        {/*		</React.Fragment>*/}
        {/*	))}*/}
        {/*</ProductList>*/}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 overflow-y-hidden md:grid-cols-3 lg:grid-cols-4">
            {Array.from(
              { length: defaultPaginationRequest.size },
              (_, index) => (
                <ProductItemSkeleton key={index} />
              ),
            )}
          </div>
        ) : (
          data?.pages?.map((page, index) => (
            <ProductItemsWrapper key={index} productItemIds={page.content} />
          ))
        )}
      </div>
      {(isFetching || hasNextPage || isFetchingNextPage) && <BaseLoader />}
      <div className="mb-10 h-10 w-full touch-none" ref={ref} />
    </>
  )
}

export default ProductListCL
