import { productCatalog, sampleCoupons } from "@/lib/catalog";

type BuildConfiguration = {
  edition: string;
  frameFinish: string;
  accessories: string[];
};

export function computeBuildPrice(configuration: BuildConfiguration) {
  const base = productCatalog.price;
  const editionDelta =
    productCatalog.variants.find((variant) => variant.name === configuration.edition)?.priceDelta ?? 0;
  const frameDelta = configuration.frameFinish === "Satin Gold" ? 3000 : configuration.frameFinish === "Black Chrome" ? 1600 : 0;
  const accessoryDelta = configuration.accessories.length * 2500;
  return base + editionDelta + frameDelta + accessoryDelta;
}

export function resolveCoupon(code?: string) {
  if (!code) {
    return null;
  }

  return sampleCoupons.find((coupon) => coupon.code.toLowerCase() === code.toLowerCase()) ?? null;
}

export function applyCoupon(amount: number, code?: string) {
  const coupon = resolveCoupon(code);

  if (!coupon) {
    return {
      amount,
      discount: 0,
      coupon: null
    };
  }

  const discount = coupon.type === "percent" ? Math.round(amount * (coupon.value / 100)) : coupon.value;

  return {
    amount: Math.max(amount - discount, 0),
    discount,
    coupon
  };
}
