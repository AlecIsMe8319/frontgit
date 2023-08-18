import React, { useState } from "react";
import CreateFloatButton from "./components/CreateFloatButton";
import PageRender from "./components/PageRender";


function MainPage() {
    const [pageOpen, setPageOpen] = useState("enter");

    const handlePageOpen = (data) => {
        setPageOpen(data);
    }

    return (
        <div>
            <PageRender openPage={pageOpen} />
            <CreateFloatButton onPageOpen={handlePageOpen} />
        </div>
    )
}


export default MainPage;