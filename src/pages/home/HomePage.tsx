import React from "react";
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
  
} from "../../components";
import { Row, Col, Typography, Spin } from "antd";
import { productList } from "./mockups";
import sideImage from "../../assets/images/side_1.jpeg";
import sideImage2 from "../../assets/images/side_2.jpg";
import sideImage3 from "../../assets/images/side_3.jpeg";
import styles from "./HomePage.module.css";
import { withTranslation, WithTranslation } from "react-i18next";
import axios from "axios";
import {connect} from "react-redux";
import { fetchRecommendProductsStartActionCreator , fetchRecommendProductsSuccessActionCreator, fetchRecommendProductsFailActionCreator,getDataActionCreator} from '../../redux/recommendProducts/recommendProductsActions';
import {RootState} from '../../redux/store';
import { MainLayout } from '../../layout/mainLayout';
// interface State {
//   productList: any[],
//   error: string | null,
//   loading: boolean
// }

type PropTypes = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapStateToDispatch>;
class HomePageComponent extends React.Component<PropTypes> {

  // constructor(props) {
  //   super(props)
  //   this.state= {
  //     productList:[],
  //     loading: true,
  //     error:null
  //   }
  // }

  async componentDidMount () {
    //this.props.getData();
  //   this.props.fetchStart()
  //   try {
  //  const {data} = await axios.get("http://123.56.149.216:8080/api/productCollections",{
  //     headers: {
  //       "x-icode":"834F0DCE8A5149C0"
  //     },
  //   })
  //   ;
  //   this.props.fetchSuccess(data);
  //   // this.setState({
  //   //   loading: false,
  //   //   error: null,
  //   //   productList:data
  //   // });
  // } catch (err) {
  //   if( err instanceof Error) {
  //     this.props.fetchFail(err)
  //     // this.setState({
  //     //   error: err.message,
  //     //   loading: false
  //     // })
  //   }
   
  //}
  }



  render() {
    // console.log(this.props.t)
    const { t } = this.props;
    const { loading, error } = this.props;
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
    else if( error ) {
      return <div>something is error</div>
    }else {
    
      return (
        <>
          
          {/* content */}
          <MainLayout>
            <Row style={{ marginTop: 20 }}>
              <Col span={6}>
                <SideMenu />
              </Col>
              <Col span={18}>
                <Carousel />
              </Col>
            </Row>
            <ProductCollection
              title={
                <Typography.Title level={3} type="warning">
                  {t("home_page.hot_recommended")}
                </Typography.Title>
              }
              sideImage={sideImage}
              products={productList[0].touristRoutes}
            />
            <ProductCollection
              title={
                <Typography.Title level={3} type="danger">
                  {t("home_page.new_arrival")}
                </Typography.Title>
              }
              sideImage={sideImage2}
              products={productList[1].touristRoutes}
            />
            <ProductCollection
              title={
                <Typography.Title level={3} type="success">
                  {t("home_page.domestic_travel")}
                </Typography.Title>
              }
              sideImage={sideImage3}
              products={productList[2].touristRoutes}
            />
           
           </MainLayout>
         
        </>
      ); 
            }
    
    
  }
}

const mapStateToProps =(state : RootState)=> {
  return {
    productList: state.recommendProducts.productList,
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error
  }
}

const mapStateToDispatch =(dispatch)=> {
  return {
    fetchStart: ()=> {
      dispatch(fetchRecommendProductsStartActionCreator)
    },
    fetchSuccess: (data)=> {
      dispatch(fetchRecommendProductsSuccessActionCreator(data))
    },
    fetchFail: (error)=> {
      dispatch(fetchRecommendProductsFailActionCreator(error))
    },
    getData: ()=> {
      dispatch(getDataActionCreator())
    }
    
  }
}

export const HomePage = connect(mapStateToProps, mapStateToDispatch)(withTranslation()(HomePageComponent));