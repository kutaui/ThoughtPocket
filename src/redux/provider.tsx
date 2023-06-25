"use client";

import store from "@/redux/store";
import {Provider} from "react-redux";
import {ThemeProvider} from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
    return <ThemeProvider attribute="class">
        <Provider store={store}>
            {children}
        </Provider>
    </ThemeProvider>

}