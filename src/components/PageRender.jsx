import React from 'react';

import Create from '../pages/Create';
import Todo from '../pages/Todo';
import Done from '../pages/Done';
import F323 from '../pages/F323';


const pageComponents = {
    todo: <Todo />,
    done: <Done />,
    create: <Create />,
    f323: <F323 />
}

function PageRender({ openPage }) {
    return (
        <div>
            {pageComponents[openPage]}
        </div>
    );
}

export default PageRender;