import React from "react"
import { Skeleton } from "@/shared/ui/skeleton"

function ProductItemSkeleton() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Skeleton className="aspect-square h-full w-full" />
      <Skeleton className="h-6 w-16" />
    </div>
  )
}

export default ProductItemSkeleton
