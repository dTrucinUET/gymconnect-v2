import { NavbarNested } from "@/component/admin/navbar/NavbarNested";
import { IconNotes, IconPictureInPictureOff } from "@tabler/icons-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {


    return (
        <div style={{ display: "flex", backgroundColor: "#f0fbfd" }} >
            <div className="course-navbar" style={{ background: "white", borderRight: "1px solid rgb(227, 227, 227)" }} >
                <NavbarNested page={"admin"} />
            </div>

            <div className="course-content" style={{ paddingLeft: "20px", paddingTop: "20px", width: "100%", transition: "width 0.3s" }}>


                {children}

            </div>

        </div>
    )
}