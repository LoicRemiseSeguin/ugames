'use client';

// import { usePathname } from 'next/navigation';
// import { useState } from 'react';

enum LogState {
    NotLogged = 0,
    Logging = 1,
    Logged = 2,
};


export default function Header() {
    const logState = LogState.Logging;
    // const [logState, setLogState] = useState(LogState.NotLogged);

    // const pathname = usePathname();

    // if (pathname.includes("login") || pathname.includes("register")) {
    //     setLogState(LogState.Logging);
    // }

    switch (logState.valueOf()) {
        case LogState.NotLogged:
            return <header>Not Logged Header</header>;
        case LogState.Logging:
            return <header>Logging Header</header>;
        case LogState.Logged:
            return <header>Logged Header</header>;
        default:
            return <header>Unknown State</header>;
    }

}