import React, { useEffect, useState } from 'react';
import Create from '../pages/Create';
import Todo from '../pages/Todo';
import Done from '../pages/Done';
import Enter from '../pages/Enter';
import F323 from '../pages/Sub1/F323';
import F709 from '../pages/Sub1/F709';
import F799 from '../pages/Sub4/F799';
import F810 from '../pages/Sub4/F810';
import F819 from '../pages/Sub4/F819';

function PageRender({ openPage }) {
    const [targetPage, setTargetPage] = useState("");

    const handleCreatePage = (data) => {
        setTargetPage(data);
    }

    const handleFlowPage = (data) => {
        setTargetPage(data);
    }
    useEffect(() => {
        setTargetPage(openPage);
    }, [openPage]);

    const pageComponents = {
        enter: <Enter />,
        todo: <Todo />,
        done: <Done />,
        create: <Create openCreatePage={handleCreatePage} />,
        f323: <F323 openFlowPage={handleFlowPage} />,
        f709: <F709 />,
        f799: <F799 />,
        f810: <F810 />,
        f819: <F819 />
    }

    return (
        <div>
            {pageComponents[targetPage]}
        </div>
    );
}

export default PageRender;