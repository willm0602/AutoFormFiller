import React from "react";
import loadReactComponent from "./loader";

const PopupComponent: React.FC = () => {
    return (
        <div
            className="prose h-[200px] w-[200px]"
        >
            <h1 className="text-3xl text-center text-primary">
                AutoForm Filler
            </h1>

            <button
                className="btn btn-main"
                onClick={() => {
                    chrome.runtime.openOptionsPage();
                }}
            >
                Open Settings Page
            </button>
        </div>
    );
};

loadReactComponent("popup", PopupComponent);
