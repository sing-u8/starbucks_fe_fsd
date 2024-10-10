import { SearchParams } from "@/shared/type/common/next"
import _ from "lodash"

import ProductCategWrapper from "@/feature/get-product-category/productCategWrapper"
import { defaultPaginationRequest } from "@/shared/type/common/request"
import {
  GetProductListIdsRequest,
  OrderCondition,
} from "@/shared/type/shop/product"
import ProductDropdown from "@/entity/product/productDropdown"
import { getDefaultProductOrderFilterValue } from "@/shared/lib/productUtils"
import { ProductCategoryQuery } from "@/shared/type/shop/product-category"
import { ProductListPage } from "@/page/product/productListPage"
import React from "react"

type ProductListPageProps = SearchParams

export default async function _ProductListPage({
  searchParams,
}: ProductListPageProps) {
  // -- get query params
  const queryObj: ProductCategoryQuery = _.omitBy(
    {
      ptcc: searchParams["ptcc"],
      pmcc: searchParams["pmcc"],
      pbcc: searchParams["pbcc"],
    },
    _.isNil,
  )
  const filterDefaultValue = getDefaultProductOrderFilterValue(
    searchParams["orderFilter"] as string,
  )
  // -- get product id list
  const defaultPagination = _.assign(defaultPaginationRequest, {})
  const reqOption: GetProductListIdsRequest = {
    topCode: (searchParams["ptcc"] as string) ?? "",
    middleCode: (searchParams["pmcc"] as string) ?? "",
    productName: "",
    priceType: undefined,
    orderCondition: filterDefaultValue.id as OrderCondition,
    ...defaultPagination,
  }
  // const res = await getProductIds(reqOption)

  return (
    <section>
      <ProductCategWrapper queryObj={queryObj} />
      <div className="itmes-center flex justify-end px-[30px] pt-2">
        <ProductDropdown defaultValue={filterDefaultValue.value} />
      </div>
      <ProductListPage reqOption={reqOption} />
    </section>
  )
}
