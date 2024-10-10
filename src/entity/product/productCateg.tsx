import React from "react"

import {
  ProductCategoryDepthType,
  ProductCategoryQuery,
  ProductCategoryType,
} from "@/shared/type/shop/product-category"
import _ from "lodash"
import { getCategoryPath } from "@/shared/lib/productCategoryUtils"
import Link from "next/link"

export interface ProductCategProps {
  categoryList: ProductCategoryType[]
  categoryCodeObj: ProductCategoryQuery
  type: ProductCategoryDepthType
}

async function ProductCateg({
  categoryList,
  categoryCodeObj,
}: ProductCategProps) {
  const categList = _.map(_.values(categoryCodeObj), (value) => value)

  // todo : make this component client to implement focus scroll usability
  return (
    <ul className="hidden-x-scroll border-b-sb-gray-0 flex h-11 select-none items-center border-b-[1px]">
      {categoryList.map((item) => {
        return (
          <li key={item.code} className="whitespace-nowrap px-3">
            <Link
              href={getCategoryPath(item, categoryCodeObj)}
              replace={true}
              className={`text-sb-gray-200 text-base font-normal ${_.some(categList, (categCode) => String(categCode) === item.code) && "text-sb-green-100"}`}>
              {item.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default ProductCateg
