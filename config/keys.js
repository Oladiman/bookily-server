if (process.env.NODE_ENV="production"){
    //we are in production, use prod keys
    module.exports=require('./prod')
}else{
    //we are in development, use dev keys
    module.exports=require('./dev')
}