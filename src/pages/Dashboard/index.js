import React, { useState, } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import { Layout, Menu } from 'antd';
import { HomeOutlined, } from '@ant-design/icons';
import { Switch, } from 'react-router-dom';

import {
    isMobile
} from "react-device-detect";

import { Header, Route } from 'components';
import { images } from 'styles';

import {
    Home,    
    Page404,
} from './subpages';

const {
    Footer, Sider
} = Layout;

const PAGES = [
    { icon: HomeOutlined, name: 'Home', path: '/', component: Home, show: true },    
];

export default function Dashboard() {

    function getPages(pages) {
        let builded_pages = [];

        pages.forEach(value => {
            builded_pages.push(
                <Route.Custom exact={true} key={value.path} path={value.path} component={value.component} />
            )

            if (value.subcomponents) {
                builded_pages = [...builded_pages, ...getPages(value.subcomponents(value.path))];
            }
        });

        return builded_pages;
    }

    const history = useHistory();
    const location = useLocation();

    const [collapse, setCollapse] = useState(isMobile);

    const pages = getPages(PAGES);
    pages.push(<Route.Custom key={'page404'} component={Page404} />);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsed={collapse}
                collapsible={!isMobile}
                onCollapse={() => {
                    setCollapse(!collapse)
                }}
            >
                <div style={{ height: '60px', width: '100%', padding: 10 }}>
                    <div className="logo" style={{ display: 'flex', height: '100%', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <img style={{ maxWidth: '60%', height: 'auto', }} src={images.logo["small"]} alt="Logo icon" />
                    </div>
                </div>

                <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="vertical">

                    {PAGES.map(value => {
                        if (value.show) {
                            return (
                                <Menu.Item
                                    onClick={() => history.push(value.path)}
                                    key={value.path}
                                >
                                    <value.icon />
                                    <span>{value.name}</span>
                                </Menu.Item>
                            )
                        }
                    })}


                </Menu>
            </Sider>

            <Layout style={{ flex: 1 }} >
                <Header />

                <Switch>
                    {pages}
                </Switch>

                <Footer style={{ textAlign: 'center' }}>
                    Example ©2020
                </Footer>

            </Layout>
        </Layout>
    );
}
