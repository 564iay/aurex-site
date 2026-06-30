import { productCatalog } from "@/lib/catalog";

export const mockDashboard = {
  purchases: [
    {
      id: "ORD-2048",
      title: productCatalog.name,
      status: "Shipped",
      total: 94900,
      trackingCode: "AURX-TRACK-5531"
    }
  ],
  savedBuilds: [
    {
      id: "build-studio-gold",
      name: "Studio Gold",
      finish: "Brushed Titanium",
      edition: "Founders",
      price: 93900
    }
  ],
  warranty: {
    serialNumber: "AX-2048-9981",
    expiresAt: "2028-11-18"
  },
  subscriptions: [
    {
      title: "AUREX Care+",
      status: "Active",
      renewsAt: "2027-01-10"
    }
  ],
  firmware: [
    {
      version: "v2.4.1",
      notes: "Improved ambient transitions and low-battery AI profile switching."
    }
  ],
  supportTickets: [
    {
      subject: "Custom engraving alignment",
      status: "Active"
    }
  ],
  analytics: {
    batteryAverage: "73%",
    immersiveUsage: "41 hours",
    favoriteMode: "Studio Silence",
    listeningHistory: ["Ambient focus", "Neo-jazz", "Classical detail"]
  }
};

export const mockAdmin = {
  stock: 42,
  revenue: "$182,400",
  conversion: "4.8%",
  customOrders: 12,
  paymentLogs: 128,
  couponsActive: 6,
  reviewsPending: 8
};
