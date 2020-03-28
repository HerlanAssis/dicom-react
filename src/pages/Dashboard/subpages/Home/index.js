import React from 'react';
import { Page } from 'components';

import { DwvComponent } from 'components';


export default function Home() {
    return (
        <Page loading={false}>
            <DwvComponent />
        </Page>
    );

}