
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";
import { ConfigProvider } from "antd";
import { OrderStoreProvider } from "@/utils/provider/order-store-provider";

import { Epilogue } from 'next/font/google'


// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sapling",
  description: "The Sustainabile Social Payments Platform",
};

const epilogue = Epilogue({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OrderStoreProvider>
      <html lang="en" className={epilogue.className}>
        <body>

          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: 'black',
                  borderRadius: 10,
                },
              }}
            >

              {children}

            </ConfigProvider>
          </AntdRegistry>
        </body>
      </html>
    </OrderStoreProvider>
  );
}
