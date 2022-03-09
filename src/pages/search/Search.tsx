import styles from './Search.module.css';
import React, {useEffect} from 'react';
import {Header, Footer, FilterArea, ProductList} from '../../components';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { searchProduct, ProductSearchSlice} from '../../redux/productSearch/slice';
import { Spin } from 'antd';
import { STATEMENT_OR_BLOCK_KEYS } from '@babel/types';
import { MainLayout } from '../../layout/mainLayout';
import { searchProducts } from "./mockup";
interface Params {
    keywords: string 
  }
export const Search : React.FC =()=> {
    const { keywords } = useParams<Params>();
    //const loading = useSelector(state =>state.productSearch.loading)
    const loading = useSelector(state=> state.productSearch.loading);
    const error= useSelector(state=> state.productSearch.error);
   // const productList = useSelector(state=> state.productSearch.data);
    const pagination = useSelector(state=> state.productSearch.pagination);

    const dispatch = useDispatch();
    const location = useLocation();
    // useEffect(()=>{
    //     dispatch(searchProduct({nextPage:1, pageSize: 10, keywords}))
    // },[location])
   // const pageSize = pagination.pageSize;
    const getPageData =(data,nextPage)=> {
      const currentPageData = data.slice((nextPage-1)*10,10);
      return currentPageData;
    }
    const onPageChange = (nextPage, pageSize)=> {
     
       // dispatch(searchProduct({nextPage, pageSize, keywords}))
      // searchProducts = searchProducts.slice((nextPage-1)*pageSize,pageSize)
      
    }

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
      }
    return (
        <div>
            <MainLayout>
                <div className={styles["page-content"]}>
                    <div className={styles["product-list-container"]}>
                        <FilterArea />
                    </div>
                    <div className={styles["product-list-container"]}>
                        <ProductList 
                            data= {searchProducts}
                        // data = {getPageData(searchProducts,pagination.currentPage)}
                            paging = {pagination}
                            onPageChange = {onPageChange}
                        />
                    </div>
                </div>
          </MainLayout>
        </div>
    )
}