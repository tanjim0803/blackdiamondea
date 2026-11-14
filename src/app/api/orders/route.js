import { getOrders, addOrder } from "@/lib/googleSheet";

const FREE_PRODUCT = "BlackDiamond_Free";
const FREE_DOWNLOAD_LINK =
  "https://drive.google.com/drive/folders/1wiEiIECiBPi3W5K3TCf8OwbuAtgEao8P?usp=sharing";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const data = await getOrders();

    // If an email query parameter is passed, check if they already ordered "BlackDiamond_Free"
    if (email) {
      let hasDownloaded = false;
      if (Array.isArray(data)) {
        const targetEmail = email.trim().toLowerCase();

        hasDownloaded = data.some((order) => {
          // Case 1: If row is stored as an object with keys
          if (order && typeof order === "object" && !Array.isArray(order)) {
            const orderEmail = (order.email || order.Email || order.EMAIL || "")
              .toString()
              .trim()
              .toLowerCase();

            const orderProduct = (
              order.product ||
              order.Product ||
              order.PRODUCT ||
              ""
            )
              .toString()
              .trim()
              .toLowerCase();

            return (
              orderEmail === targetEmail && orderProduct === "blackdiamond_free"
            );
          }

          // Case 2: If row is a raw string or array of values (like your log output)
          // We convert the whole row to a single searchable lowercase string
          const rowString = JSON.stringify(order).toLowerCase();
          const hasEmail = rowString.includes(targetEmail);
          const hasProduct = rowString.includes("blackdiamond_free");

          return hasEmail && hasProduct;
        });
      }
      return Response.json({
        success: true,
        hasDownloaded,
        ...(hasDownloaded ? { downloadLink: FREE_DOWNLOAD_LINK } : {}),
      });
    }

    // Otherwise, return all orders sorted by newest first
    if (Array.isArray(data)) {
      data.sort((a, b) => {
        const dateA = new Date(
          a["Created At"] || a.createdAt || a["CREATED AT"] || 0,
        );
        const dateB = new Date(
          b["Created At"] || b.createdAt || a["CREATED AT"] || 0,
        );
        return dateB - dateA;
      });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const { uid, name, email, phone, product, price, paymentMethod } =
      await req.json();

    if (!name || !email || !phone || !product) {
      return Response.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    const hasFreeUid =
      typeof uid === "string" && uid.trim() !== "" && uid.trim() !== "guest";

    if (product === FREE_PRODUCT && !hasFreeUid) {
      return Response.json(
        { success: false, message: "Sign in to claim the free version." },
        { status: 401 },
      );
    }

    const finalPrice = product === FREE_PRODUCT ? 0 : (price ?? 0);
    const finalPaymentMethod =
      product === FREE_PRODUCT ? "free" : paymentMethod || "card";

    const createdAt = new Date().toISOString();

    const orderId = await addOrder({
      uid: uid || "guest",
      name,
      email,
      phone,
      product,
      price: finalPrice,
      paymentMethod: finalPaymentMethod,
      createdAt,
    });

    return Response.json({
      success: true,
      orderId,
      downloadLink: FREE_DOWNLOAD_LINK,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
