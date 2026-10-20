import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Suspense } from "react";
import AntdProvider from "@/components/AntdProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { site } from "@/lib/site-config";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  // TODO(sale): thay bằng tên miền thật khi có (dùng cho ảnh Open Graph)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${site.fullName} – Chụp ảnh cưới & váy cưới tại Nam Định`,
  description: `${site.name} – ${site.slogan} ${site.intro}. Chụp ảnh cưới, thiết kế – cho thuê váy cưới, dịch vụ cưới trọn gói.`,
  openGraph: {
    title: site.fullName,
    description: site.slogan,
    locale: "vi_VN",
    type: "website",
    images: [{ url: site.banner, width: 960, height: 355, alt: `${site.name} – Premium Collection` }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFDF9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <AntdRegistry>
            <AntdProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingContact />
            </AntdProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
