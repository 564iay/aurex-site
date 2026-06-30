import { NextResponse } from "next/server";

import { formatCurrency } from "@/lib/currency";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>AUREX Invoice ${id}</title>
        <style>
          body { font-family: Arial, sans-serif; background: #0a0a0a; color: #f4efe8; padding: 40px; }
          .card { max-width: 720px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 32px; background: rgba(255,255,255,0.03); }
          h1 { letter-spacing: 0.3em; font-size: 24px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>AUREX INVOICE</h1>
          <p>Order ID: ${id}</p>
          <p>Product: AUREX Signature One</p>
          <p>Total: ${formatCurrency(94900)}</p>
          <p>Status: Paid</p>
        </div>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    }
  });
}
