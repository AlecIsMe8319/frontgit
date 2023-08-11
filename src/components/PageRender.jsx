import React from 'react';

import Portal from '../pages/Portal';
import Todo from '../pages/Todo';
import Done from '../pages/Done';

const pageComponents = {
    todo: <Todo />,
    done: <Done />,
    portal: <Portal />,
}

function PageRender({ openPage }) {
    return (
        <div>
            {pageComponents[openPage]}
        </div>
    );
}

export default PageRender;