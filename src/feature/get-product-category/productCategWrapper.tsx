import React from "react"
import { getAllTopProductCategoriesAction } from "@/shared/action/product-category/productCategoryAction"
import { mapProductCategoryFrom } from "@/shared/lib/productCategoryUtils"
import {
  BottomProductCategoryType,
  MiddleProductCategoryType,
  ProductCategoryQuery,
  ProductCategoryType,
  TopProductCategoryType,
} from "@/shared/type/shop/product-category"
import _ from "lodash"
import { redirect } from "next/navigation"
import ProductCateg from "@/entity/product/productCateg"

interface ProductCategWrapperProps {
  queryObj: ProductCategoryQuery
}

async function ProductCategWrapper({ queryObj }: ProductCategWrapperProps) {
  const res = await getAllTopProductCategoriesAction(queryObj)
  const categoryList: ProductCategoryType[][] = res.map(
    (
      item:
        | TopProductCategoryType[]
        | MiddleProductCategoryType[]
        | BottomProductCategoryType[],
    ) => {
      if (_.isNull(item) || _.isUndefined(item)) redirect("/not-found")

      return item.map((categ) => mapProductCategoryFrom(categ))
    },
  )

  return (
    <>
      {categoryList.map(
        (item, index) =>
          item.length > 0 && (
            <ProductCateg
              key={index}
              categoryList={item}
              categoryCodeObj={queryObj}
              type={item[0].type}
            />
          ),
      )}
    </>
  )
}

export default ProductCategWrapper
