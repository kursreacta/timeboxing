import React from "react";

export function TimeboxesList({ timeboxes, renderTimebox }) {
    return <div className="TimeboxesList">{timeboxes.map(renderTimebox)}</div>;
}
