"use client"
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {useDispatch, useSelector} from "react-redux";
import {useLogoutMutation} from "@/redux/slices/usersApiSlice";
import {logout} from "@/redux/slices/authSlice";
import {useTheme} from 'next-themes'

import styles from "@/css/navbar.module.css"
import Link from "next/link";
import {useEffect, useState} from "react";
import {Switch} from "@/components/ui/switch";
import toast from "react-hot-toast";

export default function Navbar() {
    const {userInfo} = useSelector((state: any) => state.auth);
    const [logoutApiCall] = useLogoutMutation();
    const [isMounted, setIsMounted] = useState(false);
    const dispatch = useDispatch();
    const {theme, setTheme} = useTheme()
    const logo = theme === "dark" ? "/logo-dark.png" : "/logo-light.png"
    const logoutHandler = async () => {
        try {
            await logoutApiCall({}).unwrap()
            dispatch(logout())
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    useEffect(() => {
        // Delay the rendering until the component is mounted on the client-side
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        // Return null or a placeholder during server-side rendering
        return null;
    }


    return <>
        <div>
            <div className={styles["navbar-container"]}>
                <div>
                    <Link className={styles["logo-container"]} href="/">
                        <Image className={styles["logo"]} src={logo} alt="logo" width={50} height={50}/>
                        <h2 className={styles["logo-title"]}>ThoughtPocket</h2>
                    </Link>
                </div>
                <div className={styles["middle-nav-container"]}>
                    <ul>
                        <Link className="hover:underline hover:scale-110" href="/dashboard">
                            <li>Dashboard</li>
                        </Link>
                        <Link className="hover:underline hover:scale-110" href="/faq">
                            <li>FAQ</li>
                        </Link>
                    </ul>
                </div>
                <div className={styles["account-container"]}>
                    <div className="mt-3.5">
                        <Switch checked={theme === "dark"}
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}/>
                    </div>
                    {userInfo === null && <Button
                        className="h-8 mt-3 dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black"
                        asChild><Link href="/auth">Login</Link></Button>}
                    {userInfo && <Button onClick={logoutHandler}
                                         className="h-8 mt-3 dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black">Logout</Button>}
                </div>
                {/* Mobile Menu */}
                <div className="lg:hidden md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="h-8 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white"
                                variant="outline">Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-1 bg-white dark:bg-black">
                            <DropdownMenuItem
                                className="hover:underline active:scale-110  active:bg-black active:text-white"><Link
                                href="/dashboard">Dashboard</Link></DropdownMenuItem>
                            <DropdownMenuItem
                                className="hover:underline active:scale-110  active:bg-black active:text-white">FAQ</DropdownMenuItem><DropdownMenuItem
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="hover:underline active:scale-110  active:bg-black active:text-white">Change
                            theme</DropdownMenuItem>
                            <DropdownMenuItem
                                className="hover:underline active:scale-110  active:bg-black active:text-white">
                                {userInfo ? <span onClick={logoutHandler}>Logout</span> :
                                    <Link href="/auth">Login</Link>}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    </>
}