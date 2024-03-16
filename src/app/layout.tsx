import {ReactNode} from "react";
import {montserrat} from "@/app/ui/fonts/fonts";
import {Header} from "@/app/ui/common/Header";
import "@/app/ui/global.css"
import StyledComponentsRegistry from "@/app/lib/registry";

export const metadata = {
  title: 'Терминал',
  description: 'Терминал оплаты мобильного телефона',
}

export default function RootLayout({children}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
    <body className={`${montserrat.className} antialiased`}>

    <Header/>

    <StyledComponentsRegistry>
      {children}
    </StyledComponentsRegistry>

    </body>
    </html>
  )
}
