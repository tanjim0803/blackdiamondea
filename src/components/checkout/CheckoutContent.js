// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { ShoppingCart, LogIn, CheckCircle2, Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/lib/firebase";

// // Payment method → internal redirect path
// const PAYMENT_METHODS = [
//   { value: "card", label: "Visa / Mastercard" },
//   { value: "paypal", label: "PayPal" },
//   { value: "stripe", label: "Stripe" },
//   { value: "crypto", label: "Bitcoin / Cryptocurrency" },
//   { value: "bank_transfer", label: "Bank Transfer" },
//   { value: "skrill", label: "Skrill" },
//   { value: "perfect", label: "Perfect Money" },
// ];

// const PAYMENT_ROUTES = {
//   paypal: "/checkout/payment/paypal",
//   skrill: "/checkout/payment/skrill",
//   bank_transfer: "/checkout/payment/bank",
//   card: "/checkout/payment/card",
//   stripe: "/checkout/payment/stripe",
//   crypto: "/checkout/payment/crypto",
//   perfect: "/checkout/payment/perfect",
// };

// export default function CheckoutContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [user] = useAuthState(auth);

//   const product = searchParams.get("product") || "";
//   const price = searchParams.get("price") || "0";

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     paymentMethod: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (user) {
//       setForm((prev) => ({
//         ...prev,
//         name: user.displayName || "",
//         email: user.email || "",
//         phone: user.phoneNumber || "",
//       }));
//     }
//   }, [user]);

//   const handleChange = (field, value) =>
//     setForm((prev) => ({ ...prev, [field]: value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!form.paymentMethod) {
//       setError("Please select a payment method.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           uid: user?.uid || "guest",
//           name: form.name,
//           email: form.email,
//           phone: form.phone,
//           product,
//           price,
//           paymentMethod: form.paymentMethod,
//           status: "pending",
//         }),
//       });
//       const data = await res.json();
//       if (!data.success)
//         throw new Error(data.message || "Failed to save order.");

//       setSubmitted(true);

//       // Redirect to the correct payment info page with order context
//       const paymentBase = PAYMENT_ROUTES[form.paymentMethod];
//       const params = new URLSearchParams({
//         product,
//         price,
//         orderId: data.orderId,
//       });
//       setTimeout(
//         () => router.push(`${paymentBase}?${params.toString()}`),
//         1200,
//       );
//     } catch (err) {
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="w-full">
//       <div className="container pt-12 md:pt-15 lg:pt-20 pb-20">
//         <div className="space-y-4 md:space-y-6 xl:space-y-8 mb-10">
//           <h2 className="text-text-primary text-center">Checkout</h2>
//           <p className="text-body text-center mt-3 lg:mt-5">
//             Complete your order details below
//           </p>
//         </div>

//         <div className="mx-auto max-w-4xl px-6">
//           <div className="grid gap-6 lg:grid-cols-5">
//             {/* Order Summary */}
//             <Card className="py-8 lg:col-span-2 h-fit">
//               <CardHeader>
//                 <div className="flex items-center gap-2">
//                   <ShoppingCart className="size-5 text-muted-foreground" />
//                   <CardTitle className="font-medium text-body-large">
//                     Order Summary
//                   </CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <Separator className="border-dashed" />
//                 <div className="space-y-3">
//                   <div className="flex items-start justify-between gap-2">
//                     <span className="text-body text-muted-foreground">
//                       Plan
//                     </span>
//                     <span className="text-body font-medium text-right break-words max-w-[60%]">
//                       {product || "—"}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between gap-2">
//                     <span className="text-body text-muted-foreground">
//                       Price
//                     </span>
//                     <Badge
//                       className="text-base text-white font-semibold px-3 py-1 bg-primary"
//                     >
//                       ${price}
//                     </Badge>
//                   </div>
//                 </div>
//                 <Separator className="border-dashed" />
//                 <div className="flex items-center justify-between">
//                   <span className="font-semibold text-body-large">Total</span>
//                   <span className="text-2xl font-semibold">${price}</span>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Right Panel */}
//             <div className="lg:col-span-3">
//               {!user ? (
//                 <Card className="py-10">
//                   <CardContent className="flex flex-col items-center justify-center gap-6 py-10 text-center">
//                     <div className="rounded-full bg-muted p-5">
//                       <LogIn className="size-10 text-muted-foreground" />
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="text-xl font-semibold">
//                         Sign in to continue
//                       </h3>
//                       <p className="text-body text-muted-foreground max-w-xs mx-auto">
//                         Please sign in to your account to order this product and
//                         complete your checkout.
//                       </p>
//                     </div>
//                     <Button asChild className="mt-2 text-white w-full max-w-xs">
//                       <Link
//                         href={`/login?redirect=/checkout?product=${encodeURIComponent(product)}&price=${price}`}
//                       >
//                         <LogIn className="size-4 mr-2" />
//                         Sign In to Order
//                       </Link>
//                     </Button>
//                     <p className="text-body text-muted-foreground text-sm">
//                       Don&apos;t have an account?{" "}
//                       <Link
//                         href="/register"
//                         className="underline underline-offset-4 hover:text-foreground transition-colors"
//                       >
//                         Create one
//                       </Link>
//                     </p>
//                   </CardContent>
//                 </Card>
//               ) : submitted ? (
//                 <Card className="py-10">
//                   <CardContent className="flex flex-col items-center justify-center gap-6 py-10 text-center">
//                     <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-5">
//                       <CheckCircle2 className="size-10 text-green-600 dark:text-green-400" />
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="text-xl font-semibold">Order Placed!</h3>
//                       <p className="text-body text-muted-foreground max-w-xs mx-auto">
//                         Redirecting you to the payment page…
//                       </p>
//                     </div>
//                     <Loader2 className="size-5 animate-spin text-muted-foreground" />
//                   </CardContent>
//                 </Card>
//               ) : (
//                 <Card className="py-8">
//                   <CardHeader>
//                     <CardTitle className="font-medium text-body-large">
//                       Your Details
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <form onSubmit={handleSubmit} className="space-y-5">
//                       <div className="space-y-2">
//                         <Label htmlFor="name">Full Name</Label>
//                         <Input
//                           id="name"
//                           placeholder="John Doe"
//                           value={form.name}
//                           onChange={(e) => handleChange("name", e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="email">Email Address</Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           placeholder="john@example.com"
//                           value={form.email}
//                           onChange={(e) =>
//                             handleChange("email", e.target.value)
//                           }
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="phone">Phone Number</Label>
//                         <Input
//                           id="phone"
//                           type="tel"
//                           placeholder="+1 234 567 8900"
//                           value={form.phone}
//                           onChange={(e) =>
//                             handleChange("phone", e.target.value)
//                           }
//                           required
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="payment">Payment Method</Label>
//                         <Select
//                           value={form.paymentMethod}
//                           onValueChange={(val) =>
//                             handleChange("paymentMethod", val)
//                           }
//                           required
//                         >
//                           <SelectTrigger id="payment" className="w-full">
//                             <SelectValue placeholder="Select payment method" className="mt-10" />
//                           </SelectTrigger>
//                           <SelectContent className={"mt-10 bg-primary text-white"}>
//                             {PAYMENT_METHODS.map((method) => (
//                               <SelectItem
//                                 key={method.value}
//                                 value={method.value}
//                               >
//                                 {method.label}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       {error && (
//                         <p className="text-sm text-red-500 dark:text-red-400">
//                           {error}
//                         </p>
//                       )}
//                       <Separator className="border-dashed" />
//                       <Button
//                         type="submit"
//                         className="w-full text-white"
//                         disabled={loading}
//                       >
//                         {loading ? (
//                           <>
//                             <Loader2 className="size-4 mr-2 animate-spin" />
//                             Placing Order…
//                           </>
//                         ) : (
//                           `Place Order — $${price}`
//                         )}
//                       </Button>
//                       <p className="text-xs text-muted-foreground text-center">
//                         By placing your order, you agree to our{" "}
//                         <Link
//                           href="/terms-condition"
//                           className="underline underline-offset-4 hover:text-foreground transition-colors"
//                         >
//                           Terms of Service
//                         </Link>
//                         .
//                       </p>
//                     </form>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  LogIn,
  CheckCircle2,
  Loader2,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

const PAYMENT_METHODS = [
  { value: "card", label: "Visa / Mastercard" },
  { value: "paypal", label: "PayPal" },
  { value: "stripe", label: "Stripe" },
  { value: "crypto", label: "Bitcoin / Cryptocurrency" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "skrill", label: "Skrill" },
  { value: "perfect", label: "Perfect Money" },
];

const PAYMENT_ROUTES = {
  paypal: "/checkout/payment/paypal",
  skrill: "/checkout/payment/skrill",
  bank_transfer: "/checkout/payment/bank",
  card: "/checkout/payment/card",
  stripe: "/checkout/payment/stripe",
  crypto: "/checkout/payment/crypto",
  perfect: "/checkout/payment/perfect",
};

const FREE_PRODUCT = "BlackDiamond_Free";

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, authLoading] = useAuthState(auth);

  const product = searchParams.get("product") || "";
  const price = searchParams.get("price") || "0";
  const isFreeProduct = product === FREE_PRODUCT;
  const displayPrice = isFreeProduct ? "0" : price;
  const userEmail = user?.email || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [claimStatus, setClaimStatus] = useState("idle");
  const [claimedDownloadLink, setClaimedDownloadLink] = useState("");
  const prefilledRef = useRef(false);

  useEffect(() => {
    if (!user || prefilledRef.current) return;
    prefilledRef.current = true;
    setForm((prev) => ({
      ...prev,
      name: prev.name || user.displayName || "",
      email: prev.email || user.email || "",
      phone: prev.phone || user.phoneNumber || "",
    }));
  }, [user]);

  useEffect(() => {
    if (!isFreeProduct || !userEmail) {
      setClaimStatus("idle");
      setClaimedDownloadLink("");
      return;
    }

    let cancelled = false;
    setClaimStatus("checking");

    const checkClaimStatus = async () => {
      try {
        const res = await fetch(
          `/api/orders?email=${encodeURIComponent(userEmail)}`,
        );
        const data = await res.json();
        if (cancelled) return;

        if (data.success && data.hasDownloaded) {
          setClaimStatus("claimed");
          setClaimedDownloadLink(data.downloadLink || "");
        } else {
          setClaimStatus("not-claimed");
        }
      } catch {
        if (!cancelled) setClaimStatus("not-claimed");
      }
    };

    checkClaimStatus();

    return () => {
      cancelled = true;
    };
  }, [isFreeProduct, userEmail]);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isFreeProduct && !form.paymentMethod) {
      setError("Please select a payment method.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user?.uid || "guest",
          name: form.name,
          email: form.email,
          phone: form.phone,
          product,
          price: isFreeProduct ? 0 : price,
          paymentMethod: isFreeProduct ? "free" : form.paymentMethod,
        }),
      });
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Failed to save order.");

      setSubmitted(true);

      if (isFreeProduct) {
        setDownloadLink(data.downloadLink || "");
        return;
      }

      const paymentBase =
        PAYMENT_ROUTES[form.paymentMethod] || "/checkout/payment/card";
      const params = new URLSearchParams({
        product,
        price,
        orderId: data.orderId,
      });
      setTimeout(
        () => router.push(`${paymentBase}?${params.toString()}`),
        1200,
      );
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      <div className="container pt-12 md:pt-15 lg:pt-20 pb-20">
        <div className="space-y-4 md:space-y-6 xl:space-y-8 mb-10">
          <h2 className="text-text-primary text-center">Checkout</h2>
          <p className="text-body text-center mt-3 lg:mt-5">
            Complete your order details below
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Order Summary */}
            <Card className="py-8 lg:col-span-2 h-fit">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="size-5 text-muted-foreground" />
                  <CardTitle className="font-medium text-body-large">
                    Order Summary
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator className="border-dashed" />
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-body text-muted-foreground">
                      Plan
                    </span>
                    <span className="text-body font-medium text-right break-words max-w-[60%]">
                      {product || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body text-muted-foreground">
                      Price
                    </span>
                    <Badge className="text-base text-white font-semibold px-3 py-1 bg-primary">
                      ${displayPrice}
                    </Badge>
                  </div>
                </div>
                <Separator className="border-dashed" />
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-body-large">Total</span>
                  <span className="text-2xl font-semibold">${displayPrice}</span>
                </div>
              </CardContent>
            </Card>

            {/* Right Panel */}
            <div className="lg:col-span-3">
              {isFreeProduct && authLoading ? (
                <Card className="py-10">
                  <CardContent className="flex flex-col items-center justify-center gap-6 py-10 text-center">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                    <p className="text-body text-muted-foreground">
                      Checking your account…
                    </p>
                  </CardContent>
                </Card>
              ) : isFreeProduct && !user ? (
                <Card className="py-10">
                  <CardContent className="flex flex-col items-center justify-center gap-6 py-10 text-center">
                    <div className="rounded-full bg-muted p-5">
                      <LogIn className="size-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        Sign in to claim your free version
                      </h3>
                      <p className="text-body text-muted-foreground max-w-xs mx-auto">
                        The free version is tied to your account. Sign in to
                        continue, or create an account first.
                      </p>
                    </div>
                    <Button asChild className="mt-2 text-white w-full max-w-xs">
                      <Link
                        href={`/login?redirect=${encodeURIComponent(
                          `/checkout?product=${encodeURIComponent(product)}&price=${encodeURIComponent(price)}`,
                        )}`}
                      >
                        <LogIn className="size-4 mr-2" />
                        Sign In to Claim
                      </Link>
                    </Button>
                    <p className="text-body text-muted-foreground text-sm">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/register"
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                      >
                        Create one
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              ) : isFreeProduct &&
                userEmail &&
                (claimStatus === "idle" || claimStatus === "checking") ? (
                <Card className="py-10">
                  <CardContent className="flex flex-col items-center justify-center gap-6 py-10 text-center">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                    <p className="text-body text-muted-foreground">
                      Checking your free-version status…
                    </p>
                  </CardContent>
                </Card>
              ) : submitted ? (
                <Card className="py-10">
                  <CardContent className="flex flex-col items-center justify-center gap-6 py-10 text-center">
                    <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-5">
                      <CheckCircle2 className="size-10 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        {isFreeProduct
                          ? "Free Version Claimed!"
                          : "Order Placed!"}
                      </h3>
                      <p className="text-body text-muted-foreground max-w-xs mx-auto">
                        {isFreeProduct
                          ? "Your download link is ready."
                          : "Redirecting you to the payment page…"}
                      </p>
                    </div>
                    {isFreeProduct ? (
                      downloadLink ? (
                        <Button asChild className="text-white">
                          <a
                            href={downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="size-4 mr-2" />
                            Open Download Link
                          </a>
                        </Button>
                      ) : (
                        <p className="text-body text-muted-foreground">
                          Contact support to receive your download link.
                        </p>
                      )
                    ) : (
                      <Loader2 className="size-5 animate-spin text-muted-foreground" />
                    )}
                  </CardContent>
                </Card>
              ) : isFreeProduct && claimStatus === "claimed" ? (
                <Card className="py-10">
                  <CardContent className="flex flex-col items-center justify-center gap-6 py-10 text-center">
                    <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-5">
                      <CheckCircle2 className="size-10 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        Free Version Already Claimed
                      </h3>
                      <p className="text-body text-muted-foreground max-w-xs mx-auto">
                        This account has already claimed the free version. Use
                        the link below to access the files.
                      </p>
                    </div>
                    {claimedDownloadLink ? (
                      <Button asChild className="text-white">
                        <a
                          href={claimedDownloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="size-4 mr-2" />
                          Open Download Link
                        </a>
                      </Button>
                    ) : (
                      <p className="text-body text-muted-foreground">
                        Contact support to receive your download link.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="py-8">
                  <CardHeader>
                    <CardTitle className="font-medium text-body-large">
                      Your Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={form.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          required
                        />
                      </div>
                      {!isFreeProduct && (
                        <div className="space-y-2">
                          <Label htmlFor="payment">Payment Method</Label>
                          <Select
                            value={form.paymentMethod}
                            onValueChange={(val) =>
                              handleChange("paymentMethod", val)
                            }
                            required
                          >
                            <SelectTrigger id="payment" className="w-full">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent className="bg-primary text-white">
                              {PAYMENT_METHODS.map((method) => (
                                <SelectItem
                                  key={method.value}
                                  value={method.value}
                                >
                                  {method.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {error && (
                        <p className="text-sm text-red-500 dark:text-red-400">
                          {error}
                        </p>
                      )}
                      <Separator className="border-dashed" />
                      <Button
                        type="submit"
                        className="w-full text-white"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="size-4 mr-2 animate-spin" />
                            {isFreeProduct ? "Claiming…" : "Placing Order…"}
                          </>
                        ) : isFreeProduct ? (
                          "Claim Free Version"
                        ) : (
                          `Place Order — $${displayPrice}`
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        By placing your order, you agree to our{" "}
                        <Link
                          href="/terms-condition"
                          className="underline underline-offset-4 hover:text-foreground transition-colors"
                        >
                          Terms of Service
                        </Link>
                        .
                      </p>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
