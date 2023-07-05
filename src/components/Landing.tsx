import styles from "@/css/landing.module.css";
import {Button} from "@/components/ui/button"
import Link from "next/link";

export default function Landing() {

    return <main className={styles["landing-container"]}>
        <div className={styles["title-container"]}>
            <h1 className={styles["first-title"]}>Your <span>Thoughts</span></h1>
            <h1 className={styles["second-title"]}>In Your <span>Pocket</span></h1>
        </div>
        <div className={styles["text-container"]}>
            <p className={styles["first-paragraph"]}>Welcome to a world where your thoughts come alive, accessible
                anytime, anywhere.</p>
            <p className={styles["second-paragraph"]}>Unlock the Boundless Potential of Your Thoughts and
                Supercharge Your Productivity Journey</p>
            <div className={styles["button-container"]}>
                <Button
                    className="hover:bg-black hover:text-white hover:scale-125 ease-in-out duration-300 transition md:text-xl md:h-12 lg:text-2xl lg:h-14 dark:bg-white dark:hover:bg-black dark:text-black dark:hover:text-white"
                    asChild>
                    <Link href="/auth" className="">Get Started</Link>
                </Button>

            </div>
        </div>
    </main>

}