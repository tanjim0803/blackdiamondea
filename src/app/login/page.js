"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LogoIcon from "../../../public/logo.gif";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  auth,
  loginWithEmailAndPassword,
  registerInWithGoogle,
} from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

function getSafeRedirect(value) {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  if (/[\\\u0000-\u001f]/.test(value)) return "/";
  try {
    const url = new URL(value, "http://localhost");
    if (url.origin !== "http://localhost") return "/";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [user, loading] = useAuthState(auth);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };

  // Re-validate live after first submit attempt
  useEffect(() => {
    if (submitted) {
      setErrors(validate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, submitted]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const user = await loginWithEmailAndPassword(email, password);
      if (user) {
        toast.success("Successfully logged in!");
        navigate.push(redirectTo);
      }
    } catch (err) {
      const firebaseErrors = {
        "email-not-verified":
          "Your email is not verified. Please check your inbox or spam folder.",
        "auth/invalid-credential":
          "Invalid email or password. Please try again.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/too-many-requests":
          "Too many failed attempts. Please try again later or reset your password.",
        "auth/user-disabled":
          "This account has been disabled. Please contact support.",
        "auth/network-request-failed":
          "Network error. Please check your connection and try again.",
      };

      const message =
        firebaseErrors[err.message] ||
        firebaseErrors[err.code] ||
        "Something went wrong. Please try again.";

      toast.error(message);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const user = await registerInWithGoogle();
      if (user) {
        toast.success("Successfully logged in!");
        navigate.push(redirectTo);
      }
      return user;
    } catch (err) {
      const firebaseErrors = {
        "auth/popup-closed-by-user":
          "Sign-in popup was closed. Please try again.",
        "auth/popup-blocked":
          "Popup was blocked by the browser. Please allow popups and try again.",
        "auth/account-exists-with-different-credential":
          "An account already exists with this email using a different sign-in method.",
        "auth/network-request-failed":
          "Network error. Please check your connection and try again.",
      };

      const message =
        firebaseErrors[err.code] || "Google sign-in failed. Please try again.";

      toast.error(message);
    }
  };

  return (
    <div className="w-full mt-18 lg:mt-36.75">
      <div className="container pt-10 lg:pt-15">
        <form
          action=""
          className="bg-card m-auto h-fit w-full max-w-xl rounded-md border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="p-8 pb-6">
            <div>
              <Link href="/" aria-label="go home">
                <Image
                  src={LogoIcon}
                  alt="BlackDiamondEA Logo"
                  className="rounded-md w-48"
                />
              </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Sign In to BlackDiamondEA
              </h1>
              <p className="text-sm">Welcome back! Sign in to continue</p>
            </div>

            <div className="mt-6 w-full">
              <Button
                type="button"
                variant="outline"
                className={"w-full"}
                onClick={handleLoginWithGoogle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="0.98em"
                  height="1em"
                  viewBox="0 0 256 262"
                >
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  ></path>
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
                <span>Google</span>
              </Button>
            </div>

            <hr className="my-4 border-dashed" />

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <Input
                  type="email"
                  required
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pwd" className="text-sm">
                    Password
                  </Label>
                  <Button asChild variant="link" size="sm">
                    <Link
                      href="/change-password"
                      className="link intent-info variant-ghost text-sm"
                    >
                      Forgot your Password ?
                    </Link>
                  </Button>
                </div>
                <Input
                  type="password"
                  required
                  name="pwd"
                  id="pwd"
                  className={`input sz-md variant-mixed ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <Button className="w-full" onClick={handleLogin}>
                Sign In
              </Button>
            </div>
          </div>

          <div className="pb-5">
            <p className="text-accent-foreground text-center text-sm">
              {"Don't"} have an account ?
              <Button asChild variant="link" className="px-2">
                <Link href="/register">Create account</Link>
              </Button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
