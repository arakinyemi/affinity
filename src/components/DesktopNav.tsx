import { currentUser } from "@clerk/nextjs/server"
import ToggleButton from "./ToggleButton";
import { Button } from "./ui/button";
import { BellIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { UserButton, SignIn, SignInButton  } from "@clerk/nextjs";

async function DesktopNav() {
    const user = await currentUser();
    return(
        <div className="hidden md:flex items-center space-x-4">
            <ToggleButton />
            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/">
                    <HomeIcon className="h-4 w-4" />
                    <span className="hidden lg:inline">Home</span>
                </Link>
            </Button>

            {user ? (
                <>
                <Button variant="ghost" className="flex items-center gap-2" asChild>
                    <Link href="/notifications">
                    <BellIcon className="w-4 h-4"/>
                    <span className="hidden lg:inline">Notifications</span>
                    </Link>
                </Button>
                <Button variant="ghost" className="flex items-center gap-2" asChild>
                    <Link href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]}`}>
                    <span className="hidden lg:inline">Profile</span>
                    </Link>
                    </Button>
                    <UserButton/>
                </>
            ) : (
                <SignInButton mode="modal">
                    <Button variant="default">Sign in</Button>
                </SignInButton>
            )
            }
        </div>
    )
}

export default DesktopNav;