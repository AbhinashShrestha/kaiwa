import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

interface SidebarProps {
    children: React.ReactNode
}
async function Sidebar({children}:SidebarProps){
    const currentUser = await getCurrentUser(); //any type to ignore typescript
    return (
        <div className="h-full">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar;