const express = require('express');
const ContenedorSql = require("../managers/contenedorSql");
const options = require("../config/dbConfig");

const router = express.Router();

const productosApi = new ContenedorSql(options.mariaDB, "products");

router.get('/',async(req,res)=>{
    const productos = await productosApi.getAll();
    res.send(productos);
})

router.get('/:id',async(req,res)=>{
    const productId = req.params.id;
    const product = await productosApi.getById(parseInt(productId));
    if(product){
        return res.send(product)
    } else{
        return res.send({error : 'producto no encontrado'})
    }
})

router.post('/',async(req,res)=>{
    const newProduct = req.body;
    console.log(newProduct);
    const result = await productosApi.save(newProduct);
    res.send(result);
})

router.put('/:id',async(req,res)=>{
    const newProduct = req.body;
    console.log(newProduct);
    const productId = req.params.id;
    const result = await productosApi.updateById(parseInt(productId),newProduct);
    res.send(result);
})

router.delete('/:id',async(req,res)=>{
    const productId = req.params.id;
    await productosApi.deleteById(parseInt(productId));
    res.send("OK");
})

module.exports = {productsRouter:router};