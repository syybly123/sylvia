import React,{useState, useEffect} from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logos.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { RootState } from "../../redux/store";
import {useSelector} from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addLanguageActionCreator, changeLanguageActionCreator, LanguageActionTypes } from "../../redux/language/languageActions";
import {useTranslation} from "react-i18next";
import MenuItem from "antd/lib/menu/MenuItem";
import jwt_decode, {JwtPayload as DefaultJwtPayload } from 'jwt-decode';
import { UserSlice } from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayload {
  username: string,

}
export const Header: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();
  const language = useSelector( (state )=>state.language.language);
  const languageList = useSelector((state)=>state.language.languageList);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  //const dispatch = useDispatch<Dispatch<LanguageActionTypes>>()
  const jwt = useSelector(state=>state.user.token);
  const [username, setUsername]  = useState("");

  const shoppingCartItems = useSelector(state=> state.shoppingCart.items);
  const shoppingCartLoading = useSelector(state => state.shoppingCart.loading);
  useEffect(()=>{
    if(jwt) {
      const token = jwt_decode<JwtPayload>(jwt)
      setUsername(token.username)
    }
  },[jwt])
  const menuClickHandler =(e) =>{
    if(e.key==="new") {
      dispatch(addLanguageActionCreator("new_language","new_lang"))
    }else {
      dispatch(changeLanguageActionCreator(e.key))
    }
  }

  const onLogout =()=> {
    dispatch(UserSlice.actions.logOut());
    history.push('/');
    
  }
  return (
    <div className={styles["app-header"]}>
      {/* top-header */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map(item=> {
                  return (<Menu.Item key={item.code}>{item.name}</Menu.Item>)
                })}
                <MenuItem key="new">{t("header.add_new_language")}</MenuItem>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language==="zh"?"中文":"english"}
          </Dropdown.Button>
         
           <Button.Group className={styles["button-group"]}>
             <span>{t("header.welcome")}&nbsp;&nbsp;</span>
             <Typography.Text strong style={{marginRight:5}}>{username}</Typography.Text>
             <div >
             <Button loading={shoppingCartLoading} onClick={()=>{history.push('/shoppingCart')}}>{t("header.shoppingCart")}({shoppingCartItems.length})</Button>
             <Button onClick={() => history.push("/register")}> {t("header.register")}</Button>
             <Button onClick={() => history.push("/signIn")}>{t("header.signin")}</Button>
             {/* <Button onClick={onLogout}>{t("header.singOut")}</Button> */}
             </div>
           </Button.Group>
           {/* :
           <Button.Group className={styles["button-group"]}>
             <div>
           <Button onClick={() => history.push("/register")}> {t("header.register")}</Button>
           <Button onClick={() => history.push("/signIn")}>{t("header.signin")}</Button>
           </div>
         </Button.Group> */}
          
        
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span onClick={() => history.push("/")} style={{cursor:"pointer"}}>
          <img src={logo} alt="logo" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
          {t("header.title")}
          </Typography.Title>
        </span>
        <Input.Search
          placeholder={"Please enter into your destination"}
          className={styles["search-input"]}
          onSearch={(keywords)=>{
            history.push("/search/" + keywords)
          }}
        />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles["main-menu"]}>
      <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
          <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
          <Menu.Item key="3"> {t("header.group")} </Menu.Item>
          <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
          <Menu.Item key="5"> {t("header.private")} </Menu.Item>
          <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
          <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
          <Menu.Item key="8"> {t("header.local")} </Menu.Item>
          <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
          <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
          <Menu.Item key="11"> {t("header.study")} </Menu.Item>
          <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
          <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
          <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
          <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
          <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
      </Menu>
    </div>
  );
};
