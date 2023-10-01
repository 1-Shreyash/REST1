const Product = require("../models/product")

const getAllProducts = async (req, res) => {

    const {company, name, featured, sort, select } = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }
    if(featured){
        queryObject.featured = featured;
    }
    if(name){
        queryObject.name = { $regex: name, $options: "i"}; //option i :-> case insensitive
        //while regex will include all the dcoimpany names having iphone, such as "iphone" & "iphone32", etc..
    }
    let apiData = Product.find(queryObject)
    if(sort){
        // let sortFix = sort.replace(","," "); // as we want to replace "," with " "(space)
        let sortFix = sort.split(",").join(" "); 
        apiData = apiData.sort(sortFix);
    }
    if(select){
        // let selectFix = select.replace(","," "); //will not work here
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5; //the second value is default

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);
    // console.log(queryObject);
    
    const Products = await apiData;
    res.status(200).json({ Products, nHibits: Products.length });
};
const getAllProductsTesting = async (req, res) => {
    const Products = await Product.find(req.query).sort("name -price").select("name");//another way
    res.status(200).json({Products});

};

module.exports = {getAllProducts, getAllProductsTesting};