import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";
import { ConfigProvider } from "antd";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sapling",
  description: "The Sustainabile Social Payments Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
  );
}
