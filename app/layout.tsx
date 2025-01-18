import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { Themes } from "@/misc/theme";
import { ViewTransitions } from "next-view-transitions";
import ErrorBoundary from "./Boundary";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";

const APP_NAME = "ClassPro";
const APP_DEFAULT_TITLE = "ClassPro";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION =
	"📖 University data, beautifully presented at your fingertips";
const PRODUCTION_URL = "https://class-pro.vercel.app";

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NODE_ENV === "production"
			? PRODUCTION_URL
			: "http://localhost:0243",
	),
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_DEFAULT_TITLE,
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
		images: [
			{
				url: "/images/og.png",
				width: 1280,
				height: 720,
				alt: APP_NAME,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
		images: ["/images/og.png"],
	},
	icons: {
		icon: [
			{
				url: "/icons/android-icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
		],
		apple: [
			{
				url: "/icons/maskable_icon_x192.png",
				sizes: "192x192",
				type: "image/png",
			},
		],
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html
				lang="en"
				className={`dark h-screen bg-light-background-normal dark:bg-dark-background-normal ${GeistSans.variable} ${GeistMono.variable}`}
			>
				<ErrorBoundary>
					<ThemeProvider>
						<meta
							name="theme-color"
							media="(prefers-color-scheme: dark)"
							content={
								Themes.find((t) => t.title === "Dark")?.properties.metacolor
							}
						/>
						<meta
							name="theme-color"
							media="(prefers-color-scheme: light)"
							content={
								Themes.find((t) => t.title === "Light")?.properties.metacolor
							}
						/>

						<meta
							name="theme-color"
							content={
								Themes.find((t) => t.title === "Dark")?.properties.metacolor
							}
						/>

						<body className="h-screen">
							<Analytics />
							<SpeedInsights />

							{children}
						</body>
					</ThemeProvider>
				</ErrorBoundary>
			</html>
		</ViewTransitions>
	);
}
