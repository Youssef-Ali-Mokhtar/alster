import classesProduct from './Product.module.css';

const Product = ({item}) => {
    return ( <div className={classesProduct['product']}>
        <p>{item.name}</p>
    </div> );
}
 
export default Product;