import {
  BottomProductCategoryType,
  ProductCategoryType,
  MiddleProductCategoryType,
  TopProductCategoryType,
  ProductCategoryQuery,
} from "@/shared/type/shop/product-category"
import {
  trimBottomCategory,
  trimMiddleCategory,
  trimTopCategory,
} from "@/shared/lib/actionUtils"
import { routes } from "@/shared/config/route"
import { createQueryParamString } from "@/shared/lib/queryParamUtils"

export const mapProductCategoryFrom = (
  productCategory:
    | TopProductCategoryType
    | MiddleProductCategoryType
    | BottomProductCategoryType,
): ProductCategoryType => {
  if (isTopProductCategory(productCategory)) {
    return {
      code: productCategory.topCategoryCode,
      name: trimTopCategory(productCategory.topCategoryName),
      type: "top",
    }
  } else if (isMiddleProductCategory(productCategory)) {
    return {
      code: productCategory.middleCategoryCode,
      name: trimMiddleCategory(productCategory.middleCategoryName),
      type: "middle",
    }
  } else if (isBottomProductCategory(productCategory)) {
    return {
      code: productCategory.bottomCategoryCode,
      name: trimBottomCategory(productCategory.bottomCategoryName),
      type: "bottom",
    }
  } else {
    throw new Error("Invalid product category")
  }
}

export const getCategoryPath = (
  productCategCode: ProductCategoryType,
  categoryCodeObj: ProductCategoryQuery,
) => {
  switch (productCategCode.type) {
    case "top":
      return `${routes.shop_productList}?${createQueryParamString({
        ptcc: productCategCode.code,
      })}`
    case "middle":
      return `${routes.shop_productList}?${createQueryParamString({
        ptcc: categoryCodeObj.ptcc,
        pmcc: productCategCode.code,
      })}`
    case "bottom":
      return `${routes.shop_productList}?${createQueryParamString({
        ptcc: categoryCodeObj.ptcc,
        pmcc: categoryCodeObj.pmcc,
        pbcc: productCategCode.code,
      })}`
    default:
      throw new Error("Invalid product category")
  }
}

function isTopProductCategory(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any,
): category is TopProductCategoryType {
  return "topCategoryName" in category
}

function isMiddleProductCategory(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any,
): category is MiddleProductCategoryType {
  return "middleCategoryName" in category
}

function isBottomProductCategory(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any,
): category is BottomProductCategoryType {
  return "bottomCategoryName" in category
}
