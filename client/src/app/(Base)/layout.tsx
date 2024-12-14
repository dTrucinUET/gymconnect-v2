import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        < >
            <Header />
            {children}
            <Footer />
        </>
    )
}