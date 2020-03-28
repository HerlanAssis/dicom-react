import React, { useRef, useState } from "react";
import { useHistory } from 'react-router-dom';

import {
    Layout,
    Menu,
    Tooltip,
    Modal,
} from 'antd';

import {
    LogoutOutlined,
    BellOutlined,
    QuestionCircleOutlined,
    UserOutlined,
} from '@ant-design/icons';

import {
    NoticeIcon,
    HeaderDropdown
} from 'ant-design-pro';

// import { KEYS } from 'constants';

const {
    Header,
} = Layout;

const confirm = Modal.confirm;

export default function CustomHeader() {
    const history = useHistory()

    const [username, setUsername] = useState('USER');

    function logout() {
        confirm({
            title: 'Sair do sistema?',
            content: 'Ao sair do sistema sua sessão será encerrada.',
            okText: 'Sair',
            cancelText: 'Cancelar',
            onOk: () => {
                window.localStorage.removeItem('token');
                window.location.reload();
            },
            onCancel: () => { },
        });
    }


    const menu = (
        <Menu selectedKeys={[]}>
            <Menu.Item key="perfil" onClick={() => {
                history.push('/perfil')
            }}>
                <UserOutlined />
                Perfil
            </Menu.Item>

            <Menu.Item key="logout" onClick={logout}>
                <LogoutOutlined />
                Logout
            </Menu.Item>
        </Menu>
    );
    const noticeIcon = useRef(null);
    let empty_array = [];

    return (
        <Header style={{ display: 'flex', backgroundColor: '#fff', padding: 10 }}>
            <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            </div>

            <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end', }}>

                <div style={{ marginRight: 20 }}>
                    <Tooltip placement="bottomRight" title={"Ajuda"}>
                        <a
                            target="_blank"
                            href={'/#'}
                            rel="noopener noreferrer"
                        >
                            <QuestionCircleOutlined style={{ fontSize: 24 }} />
                        </a>
                    </Tooltip>
                </div>

                <div style={{ marginRight: 20 }}>
                    <NoticeIcon ref={noticeIcon}
                        bell={<BellOutlined style={{ fontSize: 24 }} />}
                        count={empty_array.length}
                        onItemClick={(item, tabProps) => {
                            item.onClick();
                            noticeIcon.onClear();
                        }}
                        loading={false}
                        locale={{
                            emptyText: 'Nada a exibir',
                            clear: 'Limpar',
                            expires_today: 'Expiram hoje',
                            // next_releases: 'Próximas entregas',
                        }}
                        clearClose
                    >
                        <NoticeIcon.Tab
                            title="expires_today"
                            count={empty_array.length}
                            list={empty_array.map(task => {
                                return { title: task.title, onClick: () => { } }
                            })}
                            emptyText={'Nada a exibir.'}
                        />
                    </NoticeIcon>
                </div>

                <div style={{ marginRight: 20 }}>
                    <HeaderDropdown overlay={menu}>
                        <span>{username}</span>
                    </HeaderDropdown>
                </div>
            </div>
        </Header >);
}