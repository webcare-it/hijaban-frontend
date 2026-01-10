import type { ProductDetailsType, ProductType } from "@/type";
import { Badge } from "../ui/badge";
import { hasDiscount } from "@/helper";

interface Props {
  type: "CARD" | "DETAILS" | "INFO";
  product: ProductType | ProductDetailsType;
  productType?: string;
}

export const Discount = ({ product, type, productType }: Props) => {
  const discount = hasDiscount(product?.main_price, product?.stroked_price);
  const isDiscount = discount > 0;

  if (type === "INFO") {
    return (
      <>
        {isDiscount && (
          <p className="text-sm text-green-600 font-medium">
            {"You save"} {discount}%
          </p>
        )}
      </>
    );
  }

  if (type === "CARD" && productType?.trim()) {
    return (
      <Badge
        className={`z-10 top-2 left-2 absolute text-white text-xs font-medium`}
        variant="destructive">
        HOT
      </Badge>
    );
  }

  return (
    <>
      {isDiscount && (
        <Badge
          className={`${
            type === "DETAILS" && "text-sm font-semibold"
          } z-10 top-2 left-2 absolute text-white`}
          variant="destructive">
          {discount}%
        </Badge>
      )}
    </>
  );
};
