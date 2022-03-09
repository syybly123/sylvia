import React from 'react';
import styles from './PlaceOrder.module.css';
import { CheckOutCard, PaymentForm} from '../../components';
import { MainLayout } from '../../layout/mainLayout';
import { Row, Col} from 'antd';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../../redux/order/slice';
export const PlaceOrder : React.FC =()=> {
    const dispatch = useDispatch();
    const order = useSelector(state=> state.order.currentOrder);
    const jwt = useSelector(state=> state.user.token) as string;
    const loading = useSelector(state =>state.order.loading);
    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <PaymentForm></PaymentForm>
                </Col>
                <Col span={12}>
                    <CheckOutCard 
                    loading ={loading}
                    order = {order}
                    onCheckout = {()=>{
                        dispatch(placeOrder({jwt, orderId: order.id}))
                    }}
                    />
                </Col>
            </Row>
        </MainLayout>
    )
}