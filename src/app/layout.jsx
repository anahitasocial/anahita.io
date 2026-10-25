import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { DiagramDefs } from '../components/diagrams/parts';
import theme from '../theme';
import { site } from '../data/site';

// Downloaded at build time and served from this site: no request to Google.
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Anahita', template: '%s · Anahita' },
  description: site.description,
  icons: { icon: '/images/logo.png' },
  openGraph: { siteName: 'Anahita', type: 'website' },
  // The blog's feed, offered on every page, as feed readers expect.
  alternates: { types: { 'application/atom+xml': [{ url: '/feed.xml', title: 'Anahita' }] } },
  ...(site.hidden && { robots: { index: false, follow: false } }),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider>
          {/* Nothing is stored: every visit starts from the system's setting. */}
          <ThemeProvider theme={theme} storageManager={null} disableTransitionOnChange>
            <CssBaseline />
            <DiagramDefs />
            <Header />
            {/* Only what is in <main> goes into the search index. */}
            <main data-pagefind-body>{children}</main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
