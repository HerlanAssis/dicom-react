import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, Input, Checkbox, Button, Tabs } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { Page } from 'components';

import './styles.css';

const { TabPane } = Tabs;

const TAB_TYPES = {
    PROFISSIONAL: 'Profissional',
    CLIENTE: 'Cliente',
};

function UserAndPass() {
    return (
        <>
            <Form.Item
                name="username"
                hasFeedback
                rules={[{
                    required: true,
                    message: 'Por favor digite seu email!',
                }, {
                    type: 'email',
                    message: 'Digite um email válido!',
                },]}
            >
                <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                />
            </Form.Item>

            <Form.Item
                name="password"
                hasFeedback
                rules={[{
                    required: true,
                    message: 'Por favor digite sua senha!',
                },]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="********"
                />

            </Form.Item>
        </>
    )
}

export default function LoginPage() {

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(TAB_TYPES.TRADER);
    const [lembrar, setLembrar] = useState(true);

    function login({ username, password }) {
        window.localStorage.setItem('token', '123456');
        history.push('/');
    }

    function onSubmit(values) {
        login(values);
    };

    function onTabChange(key) {
        setType(key);
    };

    function lembrarMe(e) {
        setLembrar(e.target.checked);
    };

    return (
        <Page style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }} loading={loading}>
            <Form
                name="login"
                className="login-warp"
                initialValues={{
                    remember: true,
                }}
                onFinish={onSubmit}
            >
                <Tabs tabBarStyle={{
                    display: 'flex',
                    justifyContent: 'center'
                }} animated={false} defaultActiveKey={type} onChange={onTabChange}>
                    <TabPane key={TAB_TYPES.PROFISSIONAL} tab={TAB_TYPES.PROFISSIONAL}>
                        <UserAndPass />
                    </TabPane>

                    <TabPane key={TAB_TYPES.CLIENTE} tab={TAB_TYPES.CLIENTE}>
                        <UserAndPass />
                    </TabPane>
                </Tabs>

                <Form.Item>
                    <Form.Item name="lembrarme" valuePropName="checked" noStyle>
                        <Checkbox
                            onChange={lembrarMe}
                            checked={lembrar}
                        >Lembrar me</Checkbox>
                    </Form.Item>

                    <Button type="link">
                        Esqueceu a senha?
                    </Button>
                </Form.Item>

                <div>
                    <Button type="primary" block htmlType="submit" className="login-form-button">
                        Entrar
                     </Button>
                </div>
                <div style={{
                    marginTop: '15px',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <span>Ainda não tem conta?</span>
                    <Button htmlType="submit" type="link" onClick={() => { }}>
                        Cadastrar-se!
                    </Button>
                </div>
            </Form>
        </Page>
    );

}
