import React from 'react';
import {Image, Typography } from "antd";
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
interface Proptypes extends RouteComponentProps {
    id: number | string;
    size: "large" | "small";
    imageSrc: string;
    price: number | string;
    title: string;
}
const ProductImageComponent: React.FC<Proptypes> =({id, size, imageSrc, price, title, history, match, location})=> {
    return (
    <div onClick={()=> {history.push(`detail/${id}`)}}>

        {size == "large" ? (<Image src={imageSrc} height={265} width={470}></Image>) : 
        (<Image src={imageSrc} height={120} width={230}></Image>)
    }
        <div>
            <Typography.Text type="secondary">{title.slice(0,25)}</Typography.Text>
            <Typography.Text type="danger" strong>$ {price}</Typography.Text>
        </div>
    </div>
    )
}

export const ProductImage = withRouter(ProductImageComponent)