import React,{ useState, useEffect} from 'react';
import { RouteComponentProps, useParams}  from 'react-router-dom';
import { Row, Col, Typography, Spin, DatePicker, Divider, Anchor, Menu, Button } from "antd";
import styles from "./Detail.module.css";
import { commentMockData, productDetail } from './mockup';
import { ProductDetailSlice , getProductDetail} from '../../redux/productDetail/slice';
import { useSelector } from '../../redux/hooks';
import {
    Header,
    Footer,
    ProductIntro,
    ProductComments
  } from "../../components";
import axios from 'axios';
import MenuItem from 'antd/lib/menu/MenuItem';
import { useDispatch } from 'react-redux';
import { MainLayout } from '../../layout/mainLayout';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addShoppingCartItem , addItem} from '../../redux/shoppingCart/slice';
interface MatchParams{
    touristRouteId: string;
}

const { RangePicker } = DatePicker;
export const Detail : React.FC<RouteComponentProps<MatchParams>> = (props)=> {
    const {touristRouteId} = useParams<MatchParams>();
   // const [loading, setLoading] = useState<boolean>(true);
   // const [product,setProduct] = useState<any>(null);
    //const [error, setError] = useState<string | null>(null);
    const loading = useSelector(state=> state.productDetail.loading);
    const error = useSelector(state=> state.productDetail.error);
    //const product = useSelector(state=> state.productDetail.data);
    const product = productDetail
    const dispatch = useDispatch();
    const jwt = useSelector(state=> state.user.token) as string;
    const shoppingCartloading = useSelector(state =>state.shoppingCart.loading)
    // useEffect(()=> {
    //     dispatch(getProductDetail(touristRouteId));
    // },[])

    if( loading) {
        return (
          <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight:"auto",
            width: "100%"
          }}
          />
        )
      }
      if( error ) {
        return <div>something is error</div>
      }else {
    return (
        <div>
       <MainLayout>
        <div className={styles["page-content"]}>
                <div className={styles["product-intro-container"]}>
                    <Row>
                        <Col span={13}>
                          <ProductIntro
                            title={product.title}
                            description={product.description}
                            price={product.originalPrice}
                            coupons={product.discountPresent}
                            discount={product.price}
                            rating={product.rating}
                            pictures={product.touristRoutePictures.map(p=> p.url)}
                        /></Col>
                        <Col span={11}>
                          <Button style={{marginTop:30, marginBottom:50, display:"block"}} type="primary" danger loading={shoppingCartloading}
                          onClick={()=> {
                           // dispatch(addShoppingCartItem({jwt, touristRouteId: product.id}))
                            dispatch(addItem(product))
                          }}
                          >
                            <ShoppingCartOutlined/>
                            Add ShoppingCart</Button>
                          <RangePicker open style={{marginTop:20}}/>
                          </Col>
                    </Row>
                     </div>
                {/* <Anchor className={styles["product-detail-anchor"]}>
                  <Menu mode="horizontal">
                    <MenuItem key="1"></MenuItem>
                    <Anchor.Link 
                      href='#feature' title="Product Features"
                    ></Anchor.Link>
                    <MenuItem key="2"></MenuItem>
                    <Anchor.Link 
                      href='#fees' title="Product Fees"
                    ></Anchor.Link>
                
                    <MenuItem key="3"></MenuItem>
                    <Anchor.Link 
                      href='#comments' title="User Comments"
                    ></Anchor.Link>
                  </Menu>
                </Anchor> */}
                <div id="feature" className={styles["product-detail-container"]}>
                  <Divider orientation="center">
                    <Typography.Title level={3}>Product Features</Typography.Title>
                  </Divider>
                  <div dangerouslySetInnerHTML={{__html:product.features}}
                  style={{margin:50}}
                  ></div>
                </div>
                <div id="fees" className={styles["product-detail-container"]}>
                <Divider orientation="center">
                    <Typography.Title level={3}>Product Fees</Typography.Title>
                  </Divider>
                  <div dangerouslySetInnerHTML={{__html:product.fees}}
                  style={{margin:50}}
                  ></div>
                </div>
                
                <div id="comments" className={styles["product-detail-container"]}>
                <Divider orientation="center">
                    <Typography.Title level={3}>User Comments</Typography.Title>
                  </Divider>
                 <div style={{margin:40}}>
                   <ProductComments
                     data={commentMockData}
                   />
                 </div>
                </div>
            </div>
       </MainLayout>
        </div>
    )
      }
}