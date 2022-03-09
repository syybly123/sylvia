import styles from './ProductIntro.module.css';
import React from 'react';
import { Typography, Carousel, Image, Rate, Table} from "antd";
import { ColumnsType }from "antd/es/table";
interface PropTypes{
    title: string,
    description: string,
    price: string | number,
    coupons: number | null,
    discount: number,
    rating: string | number,
    pictures: string[]
}
const Columns : ColumnsType<RowType> =[
    {
        title:"title",
        dataIndex:"title",
        key:"title",
        align: "left",
        width: 120,
    },
    {
        title:"description",
        dataIndex:"description",
        key:"description",
        align: "center",
    },
];

interface RowType {
    title: string,
    description: string | number | JSX.Element,
    key: number
}
export const ProductIntro : React.FC<PropTypes>=({
    title,
    description,
    price,
    coupons,
    discount,
    rating,
    pictures
})=> {
    const tableDataSource: RowType[] = [
        {
          key: 0,
          title: "Route Name",
          description: title,
        },
        {
          key: 1,
          title: "Price",
          description: (
            <>
              ¥{" "}
              <Typography.Text type="danger" strong>
                {price}
              </Typography.Text>
            </>
          ),
        },
        {
          key: 2,
          title: "Limited Discount",
          description: discount ? (
            <>
              ¥ <Typography.Text delete>{price}</Typography.Text>{" "}
              <Typography.Text type="danger" strong>
                ¥ {discount}
              </Typography.Text>
            </>
          ) : (
            "No Discount"
          ),
        },
        {
          key: 2,
          title: "Coupon",
          description: coupons ? discount : "No Coupon",
        },
        {
          key: 2,
          title: "Route Reviews",
          description: (
            <>
              <Rate allowHalf defaultValue={+rating} />
              <Typography.Text style={{ marginLeft: 10 }}>
                {rating} Star
              </Typography.Text>
            </>
          ),
        },
      ];
    return <div className={styles["intro-container"]}>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Text>{description}</Typography.Text>
        <div className={styles["intro-detail-content"]}>
            <Typography.Text style={{marginLeft:20}}>
               $ <span className={styles["intro-detail-strong-text"]}>{price}</span> /person
            </Typography.Text>
            <Typography.Text style={{marginLeft:50}}>
               rating <span className={styles["intro-detail-strong-text"]}>{rating}</span> 
            </Typography.Text>
            <Carousel autoplay slidesToShow={3}>
                {pictures.map(picture =>
                    
                    <Image height={150} src={picture}/>
                        
            )}
            </Carousel>
            <Table<RowType> columns={Columns} 
            dataSource={tableDataSource}
            size="small"
            bordered={false}
            pagination={false}
            />
        </div>
    </div>
}