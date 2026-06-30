import { prisma } from "@/lib/prisma";
import { mockDashboard } from "@/lib/mock";

export async function getDashboardSnapshot(userId?: string) {
  if (!userId) {
    return mockDashboard;
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5
    });

    return {
      ...mockDashboard,
      purchases:
        orders.length > 0
          ? orders.map((order) => ({
              id: order.id,
              title: "AUREX Order",
              status: order.status,
              total: order.total,
              trackingCode: order.trackingCode ?? "Pending"
            }))
          : mockDashboard.purchases
    };
  } catch {
    return mockDashboard;
  }
}
