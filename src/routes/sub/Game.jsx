import React from "react";
import { Outlet } from 'react-router-dom';
export default function Game() {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    );
}