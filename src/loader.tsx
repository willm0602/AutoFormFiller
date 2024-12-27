import React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

export default function loadReactComponent(
    rootID: string,
    Component: React.FC,
    props: any = {},
): void {
    const container = document.getElementById(rootID);

    if (container) {
        const root = createRoot(container);
        root.render(<Component {...props} />);
    } else {
        console.error(`Unable to find container (#${rootID})`);
    }
}
